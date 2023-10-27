<template>
    <div class="main-container">
        <v-data-table
            sort-by="id"
            :search="search"
            :headers="headers"
            :items="books"
            class="elevation-1 custom-table"
            :footer-props="{ itemsPerPageText: 'Registros por página:', itemsPerPageAllText: 'Exibir tudo' }"
            :header-props="{ sortByText: 'Ordenar por' }"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Livros ({{ bookCount }})</v-toolbar-title>
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
                                                    v-model="BookItem.name"
                                                    label="Nome"
                                                    append-icon="mdi-book"
                                                ></v-text-field>
                                            </v-row>

                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-text-field
                                                    color="indigo lighten-1"
                                                    required
                                                    :rules="rules"
                                                    v-model="BookItem.author"
                                                    label="Autor"
                                                    append-icon="mdi-book-edit"
                                                ></v-text-field>
                                            </v-row>

                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-autocomplete
                                                    v-model="BookItem.publisherId"
                                                    :items="publishers"
                                                    item-text="name"
                                                    item-value="id"
                                                    color="indigo lighten-1"
                                                    :rules="rules"
                                                    label="Selecione a editora"
                                                    required
                                                ></v-autocomplete>
                                            </v-row>

                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-text-field
                                                    type="number"
                                                    color="indigo lighten-1"
                                                    required
                                                    :rules="rules"
                                                    v-model="BookItem.launchDate"
                                                    label="Ano de lançamento"
                                                    append-icon="mdi-calendar-range"
                                                ></v-text-field>
                                            </v-row>

                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-text-field
                                                    type="number"
                                                    color="indigo lighten-1"
                                                    required
                                                    :rules="rules"
                                                    v-model="BookItem.totalQuantity"
                                                    label="Quantidade"
                                                    append-icon="mdi-numeric"
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
                            >
                                mdi-information-outline
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
                            <span class="text-subtitle-1 font-weight-medium"> Detalhes de {{ specificBook.name }}</span>
                            <v-spacer></v-spacer>
                            <v-btn text @click="dialog.value = false">
                                <v-icon> mdi-close </v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-simple-table>
                            <template v-slot:default>
                                <tbody>
                                    <tr>
                                        <th class="text-left">Quant. Disponível</th>
                                        <th class="text-left">Quant. de vezes alugado</th>
                                    </tr>
                                    <tr>
                                        <td class="text-h6">{{ specificBook.availableQuantity }}</td>
                                        <td class="text-h6">{{ specificBook.totalTimesRented }}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-left">Inserção no sistema</th>
                                        <th class="text-left">Última vez atualizado</th>
                                    </tr>
                                    <tr>
                                        <td>{{ formatDateTime(specificBook.createdAt) }}</td>
                                        <td>{{ formatDateTime(specificBook.updatedAt) }}</td>
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
import BookApi from '@/services/BookService';
import PublisherApi from '@/services/PublisherService';
import { showAlertToast, showAlertRemove, showAlertError } from '@/components/sweetalert';
import { format, utcToZonedTime } from 'date-fns-tz';

export default {
    data: () => ({
        books: [],
        publishers: [],
        showInfoDialog: false,
        search: '',
        dialog: false,
        dialogDelete: false,
        bookCount: 0,
        specificBook: [],
        headers: [
            { text: 'ID', value: 'id', align: 'start', sortable: true },
            { text: 'Nome', value: 'name', align: 'start' },
            { text: 'Autor', value: 'author', align: 'start' },
            { text: 'Editora', value: 'publisherName', align: 'start' },
            { text: 'Lançamento', value: 'launchDate', align: 'start' },
            { text: 'Quantidade', value: 'totalQuantity', align: 'start' },
            { text: 'Ações', value: 'actions', sortable: false, align: 'center' }
        ],

        BookItem: {
            id: null,
            name: '',
            publisherName: '',
            author: '',
            launchDate: '',
            totalQuantity: 0,
            availableQuantity: 0,
            totalTimesRented: 0
        },

        rules: [(value) => !!value || 'Este campo é obrigatório.'],

        error: []
    }),
    computed: {
        formTitle() {
            return !this.BookItem.id ? 'Novo Livro' : 'Atualizar Livro';
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        }
    },

    mounted() {
        this.listAll();
        this.loadPublisherList();
        this.calculateTotalBooks();
    },

    methods: {
        listAll() {
            BookApi.listAll().then((resposta) => {
                this.books = resposta.data;
            });
        },

        loadPublisherList() {
            PublisherApi.listAll().then((resposta) => {
                this.publishers = resposta.data;
            });
        },

        create() {
            if (this.$refs.form.validate()) {
                BookApi.create(this.BookItem)
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
            this.BookItem = {
                id: item.id,
                name: item.name,
                publisherId: null,
                author: item.author,
                launchDate: item.launchDate,
                totalQuantity: item.totalQuantity,
                availableQuantity: item.availableQuantity,
                totalTimesRented: item.totalTimesRented
            };

            const selectedPublisher = this.publishers.find((publisher) => publisher.name === item.publisherName);

            if (selectedPublisher) {
                this.BookItem.publisherId = selectedPublisher.id;
            }

            this.dialog = true;
        },

        close() {
            this.dialog = false;
            (this.BookItem = {
                id: null,
                name: '',
                publisherid: null,
                author: '',
                launchDate: '',
                totalQuantity: 0,
                availableQuantity: 0,
                totalTimesRented: 0
            }),
                this.$refs.form.resetValidation();
        },

        deleteItemConfirm(item) {
            BookApi.delete(item.id)
                .then(() => {
                    showAlertToast('success', 'Registro deletado com sucesso.');
                    this.listAll();
                })
                .catch((error) => {
                    showAlertError('Ops', error.response.data.message);
                });
        },

        onClickSave() {
            if (this.BookItem.id) {
                return this.update(this.BookItem);
            }
            this.create(this.BookItem);
        },

        OnClickDelete(item) {
            showAlertRemove(() => this.deleteItemConfirm(item), item.name);
        },

        update() {
            if (this.$refs.form.validate()) {
                BookApi.update(this.BookItem)
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

        formatDateTime(dateTime) {
            if (dateTime) {
                const zonedDateTime = utcToZonedTime(dateTime, 'America/Sao_Paulo');
                return format(zonedDateTime, 'dd/MM/yyyy HH:mm:ss', { timeZone: 'America/Sao_Paulo' });
            }
            return '';
        },

        calculateTotalBooks() {
            BookApi.listAll()
                .then((response) => {
                    this.bookCount = response.data.length;
                })
                .catch((error) => {
                    console.error('Error fetching books:', error);
                });
        },

        findById(item) {
            BookApi.findById(item.id).then((response) => {
                this.specificBook = response.data;
            });
        },

        openInfoDialog(item) {
            this.findById(item);
            this.showInfoDialog = true;
        }
    }
};
</script>

<style scoped>
@import '../assets/styles/TableViews.css';
</style>
