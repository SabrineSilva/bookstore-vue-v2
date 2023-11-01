<template>
    <div class="main-container">
        <v-data-table
            sort-by="id"
            :search="search"
            :headers="headers"
            :items="publisher"
            class="elevation-1 custom-table"
            :footer-props="{ itemsPerPageText: 'Registros por página:', itemsPerPageAllText: 'Exibir tudo' }"
            :header-props="{ sortByText: 'Ordenar por' }"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Editoras ({{ publisherCount }})</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>

                    <v-dialog persistent v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn elevation="3" color="indigo lighten-1" v-bind="attrs" v-on="on" fab dark small>
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <v-card class="add-form rounded-xl pa-3">
                            <v-card-title class="justify-space-between" style="margin-bottom: 10px">
                                <div class="dialog-header">
                                    <span class="text-h5 form-title font-weight-medium">{{ formTitle }}</span>

                                    <v-btn class="close-icon" icon @click="close">
                                        <v-icon> mdi-close </v-icon>
                                    </v-btn>
                                </div>
                            </v-card-title>

                            <v-card-text>
                                <v-form ref="form" lazy-validation>
                                    <v-row>
                                        <v-col>
                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-text-field
                                                    color="indigo lighten-1"
                                                    required
                                                    :rules="rules"
                                                    v-model="PublisherItem.name"
                                                    label="Nome"
                                                    append-icon="mdi-home-city"
                                                ></v-text-field>
                                            </v-row>

                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-text-field
                                                    color="indigo lighten-1"
                                                    required
                                                    :rules="rules"
                                                    v-model="PublisherItem.city"
                                                    label="Cidade"
                                                    append-icon="mdi-map-marker"
                                                ></v-text-field>
                                            </v-row>
                                        </v-col>
                                    </v-row>

                                    <v-card-actions>
                                        <div style="width: 100%" class="text-center">
                                            <v-btn color="indigo lighten-1" text @click="onClickSave"> Salvar </v-btn>
                                        </div>
                                    </v-card-actions>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-dialog>

                    <v-spacer></v-spacer>

                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Pesquisar"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-toolbar>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
                <div class="action-column">
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon
                                color="light-blue darken-2"
                                class="icon-table mr-2"
                                @click="updateItem(item)"
                                v-bind="attrs"
                                v-on="on"
                            >
                                mdi-pencil
                            </v-icon>
                        </template>
                        <span>Atualizar</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon
                                color="red lighten-1"
                                class="icon-table mr-2"
                                @click="OnClickDelete(item)"
                                v-bind="attrs"
                                v-on="on"
                            >
                                mdi-delete
                            </v-icon>
                        </template>
                        <span>Excluir</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon
                                color="purple lighten-1"
                                class="icon-table"
                                @click="openInfoDialog(item)"
                                v-bind="attrs"
                                v-on="on"
                                large
                            >
                                mdi-information-symbol
                            </v-icon>
                        </template>
                        <span>Detalhes</span>
                    </v-tooltip>
                </div>
            </template>
            <template v-slot:no-data>
                <span>Nada foi encontrado.</span>
            </template>
            <template v-slot:no-results>
                <span>Nada foi encontrado.</span>
            </template>
        </v-data-table>
        <v-col cols="auto">
            <v-dialog v-model="showInfoDialog" max-width="500">
                <template v-slot:default="dialog">
                    <v-card>
                        <v-toolbar color="primary" dark>
                            <v-icon class="mr-2">mdi-city</v-icon>
                            <span class="text-subtitle-1 font-weight-medium">
                                Detalhes de {{ specificPublisher.name }}</span
                            >
                            <v-spacer></v-spacer>
                            <v-btn text @click="dialog.value = false">
                                <v-icon> mdi-close </v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-simple-table>
                            <template v-slot:default>
                                <tbody>
                                    <tr>
                                        <th class="text-left">Inserção no sistema</th>
                                        <th class="text-left">Última vez atualizada</th>
                                    </tr>

                                    <tr>
                                        <td>{{ formatDateTime(specificPublisher.createdAt) }}</td>
                                        <td>{{ formatDateTime(specificPublisher.updatedAt) }}</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card>
                </template>
            </v-dialog>
        </v-col>
    </div>
</template>

<script>
import PublisherApi from '@/services/PublisherService';
import { showAlertToast, showAlertRemove, showAlertError } from '@/components/sweetalert';
import { format, utcToZonedTime } from 'date-fns-tz';

export default {
    data: () => ({
        publisher: [],
        specificPublisher: [],
        search: '',
        dialog: false,
        dialogDelete: false,
        showInfoDialog: false,
        publisherCount: 0,
        headers: [
            { text: 'ID', align: 'start', sortable: true, value: 'id' },
            { text: 'Nome', value: 'name', align: 'start' },
            { text: 'Cidade', value: 'city', align: 'start' },
            { text: 'Ações', value: 'actions', sortable: false, align: 'center' }
        ],

        PublisherItem: {
            id: null,
            name: '',
            city: ''
        },

        rules: [(value) => !!value || 'Este campo é obrigatório.'],

        errors: []
    }),
    computed: {
        formTitle() {
            return !this.PublisherItem.id ? 'Nova Editora' : 'Atualizar Editora';
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        }
    },

    mounted() {
        this.listAll();
        this.calculateTotalPublishers();
    },

    methods: {
        calculateTotalPublishers() {
            PublisherApi.listAll()
                .then((response) => {
                    this.publisherCount = response.data.length;
                })
                .catch((error) => {
                    console.error('Error fetching publishers:', error);
                });
        },

        listAll() {
            PublisherApi.listAll().then((response) => {
                this.publisher = response.data;
            });
        },

        findById(item) {
            PublisherApi.findById(item.id).then((response) => {
                this.specificPublisher = response.data;
            });
        },

        create() {
            if (this.$refs.form.validate()) {
                PublisherApi.create(this.PublisherItem)
                    .then(() => {
                        this.close();
                        showAlertToast('success', 'Registro criado com sucesso.');
                        this.listAll();
                    })
                    .catch((error) => {
                        showAlertError('Ops', error.response.data.message);
                    });
            }
        },

        updateItem(item) {
            this.PublisherItem = Object.assign({}, item);
            this.dialog = true;
        },

        close() {
            this.dialog = false;

            this.PublisherItem = {
                id: null,
                name: '',
                city: ''
            };

            this.$refs.form.resetValidation();
        },

        deleteItemConfirm(item) {
            PublisherApi.delete(item.id)
                .then(() => {
                    showAlertToast('success', 'Registro deletado com sucesso.');
                    this.listAll();
                })
                .catch(() => {
                    showAlertError('Não foi possível apagar.', 'A editora possui associação com algum livro.');
                });
        },

        onClickSave() {
            if (this.PublisherItem.id) {
                return this.edit(this.PublisherItem);
            }
            this.create(this.PublisherItem);
        },

        OnClickDelete(item) {
            showAlertRemove(() => this.deleteItemConfirm(item), item.name);
        },

        edit() {
            if (this.$refs.form.validate()) {
                PublisherApi.update(this.PublisherItem)
                    .then(() => {
                        this.close();
                        showAlertToast('success', 'Registro atualizado com sucesso.');
                        this.listAll();
                    })
                    .catch((error) => {
                        showAlertError('Ops', error.response.data.message);
                    });
            }
        },

        openInfoDialog(item) {
            this.findById(item);
            this.showInfoDialog = true;
        },

        formatDateTime(dateTime) {
            if (dateTime) {
                const zonedDateTime = utcToZonedTime(dateTime, 'America/Sao_Paulo');
                return format(zonedDateTime, 'dd/MM/yyyy HH:mm:ss', { timeZone: 'America/Sao_Paulo' });
            }
            return '';
        }
    }
};
</script>

<style scoped>
@import '../assets/styles/TableViews.css';
</style>
