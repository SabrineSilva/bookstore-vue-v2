<template>
    <div class="main-container">
        <v-data-table
            sort-by="id"
            :search="search"
            :headers="headers"
            :items="users"
            class="elevation-1 custom-table"
            :footer-props="{ itemsPerPageText: 'Registros por página:', itemsPerPageAllText: 'Exibir tudo' }"
            :header-props="{ sortByText: 'Ordenar por' }"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Clientes ({{ userCount }})</v-toolbar-title>
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
                                                    v-model="userItem.name"
                                                    label="Nome"
                                                    append-icon="mdi-account"
                                                ></v-text-field>
                                            </v-row>
                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-text-field
                                                    type="email"
                                                    color="indigo lighten-1"
                                                    required
                                                    :rules="emailRules"
                                                    v-model="userItem.email"
                                                    label="E-mail"
                                                    append-icon="mdi-email"
                                                ></v-text-field>
                                            </v-row>
                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-text-field
                                                    color="indigo lighten-1"
                                                    required
                                                    :rules="rules"
                                                    v-model="userItem.city"
                                                    label="Cidade"
                                                    append-icon="mdi-home-city"
                                                ></v-text-field>
                                            </v-row>
                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-text-field
                                                    color="indigo lighten-1"
                                                    required
                                                    :rules="rules"
                                                    v-model="userItem.address"
                                                    label="Endereço"
                                                    append-icon="mdi-map-marker"
                                                ></v-text-field>
                                            </v-row>
                                        </v-col>
                                    </v-row>

                                    <v-card-actions>
                                        <div style="width: 100%" class="text-center">
                                            <v-btn color="indigo lighten-1" text @click="onClickcreate"> Salvar </v-btn>
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
            <v-dialog v-model="showInfoDialog" max-width="550">
                <template v-slot:default="dialog">
                    <v-card>
                        <v-toolbar color="primary" dark>
                            <v-icon class="mr-2">mdi-city</v-icon>
                            <span class="text-subtitle-1 font-weight-medium"> Detalhes de {{ specificUser.name }}</span>
                            <v-spacer></v-spacer>
                            <v-btn text @click="dialog.value = false">
                                <v-icon> mdi-close </v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-simple-table>
                            <template v-slot:default>
                                <tbody>
                                    <tr>
                                        <th class="text-left">Quant. de aluguéis realizados</th>
                                        <th class="text-left">Inserção no sistema</th>
                                        <th class="text-left">Última vez atualizado</th>
                                    </tr>
                                    <tr>
                                        <td class="text-h6" align="center">{{ specificUser.numberOfRentals }}</td>
                                        <td>{{ formatDateTime(specificUser.createdAt) }}</td>
                                        <td>{{ formatDateTime(specificUser.updatedAt) }}</td>
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
import UserApi from '@/services/UserService';
import { showAlertToast, showAlertRemove, showAlertError } from '@/components/sweetalert';
import { format, utcToZonedTime } from 'date-fns-tz';

export default {
    data: () => ({
        users: [],
        specificUser: [],
        search: '',
        dialog: false,
        dialogDelete: false,
        showInfoDialog: false,
        userCount: 0,
        headers: [
            { text: 'ID', value: 'id', align: 'start', sortable: true },
            { text: 'Nome', value: 'name', align: 'start' },
            { text: 'E-mail', value: 'email', align: 'start' },
            { text: 'Cidade', value: 'city', align: 'start' },
            { text: 'Endereço', value: 'address', align: 'start' },
            { text: 'Ações', value: 'actions', sortable: false, align: 'center' }
        ],

        userItem: {
            id: null,
            name: '',
            email: '',
            city: '',
            address: ''
        },

        rules: [
            (value) => !!value || 'Este campo é obrigatório.',
            (value) => (value || '').length <= 50 || 'Máximo de 50 caracteres'
        ],

        emailRules: [
            (value) => !!value || 'Este campo é obrigatório.',
            (value) => (value || '').length <= 50 || 'Máximo de 50 caracteres',
            (value) => {
                const pattern =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value) || 'E-mail inválido';
            }
        ],

        error: []
    }),

    computed: {
        formTitle() {
            return !this.userItem.id ? 'Novo Cliente' : 'Atualizar Cliente';
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        }
    },
    mounted() {
        this.listAll();
        this.calculateTotalUsers();
    },

    methods: {
        listAll() {
            UserApi.listAll().then((resposta) => {
                this.users = resposta.data;
            });
        },

        create() {
            if (this.$refs.form.validate()) {
                UserApi.create(this.userItem)
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
            this.userItem = Object.assign({}, item);
            this.dialog = true;
        },

        close() {
            this.dialog = false;
            this.userItem = {
                id: null,
                name: '',
                email: '',
                city: '',
                address: ''
            };
            this.$refs.form.resetValidation();
        },

        deleteItemConfirm(item) {
            UserApi.delete(item.id)
                .then(() => {
                    showAlertToast('success', 'Registro deletado com sucesso.');
                    this.listAll();
                })
                .catch(() => {
                    showAlertError('Não foi possível apagar.', 'O Cliente possui associação com algum livro.');
                });
        },

        onClickcreate() {
            if (this.userItem.id) {
                return this.update(this.userItem);
            }
            this.create(this.userItem);
        },

        OnClickDelete(item) {
            showAlertRemove(() => this.deleteItemConfirm(item), item.name);
        },

        update() {
            if (this.$refs.form.validate()) {
                UserApi.update(this.userItem)
                    .then(() => {
                        this.close();
                        showAlertToast('success', 'Registro atualizado com sucesso.');
                        this.listAll();
                        this.$refs.form.resetValidation();
                    })
                    .catch((error) => {
                        showAlertError('Ops', error.response.data.message);
                    });
            }
        },

        findById(item) {
            UserApi.findById(item.id).then((response) => {
                this.specificUser = response.data;
            });
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
        },

        calculateTotalUsers() {
            UserApi.listAll()
                .then((response) => {
                    this.userCount = response.data.length;
                })
                .catch((error) => {
                    console.error('Error fetching users:', error);
                });
        }
    }
};
</script>

<style>
@import '../assets/styles/TableViews.css';
</style>
