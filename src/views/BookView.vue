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
                    <v-toolbar-title>Livros</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>

                    <v-dialog persistent v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn elevation="3" color="indigo lighten-1" v-bind="attrs" v-on="on" fab dark small>
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <v-card class="add-form rounded-xl pa-3">
                            <v-card-title class="justify-space-between" style="margin-bottom: 10px">
                                <v-btn disabled style="opacity: 0">
                                    <v-icon> mdi-close </v-icon>
                                </v-btn>
                                <span class="text-h5 align-center font-weight-medium">{{ formTitle }}</span>
                                <v-btn icon @click="close">
                                    <v-icon> mdi-close </v-icon>
                                </v-btn>
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
                                                    v-model="BookItem.nome"
                                                    label="Nome"
                                                    append-icon="mdi-book"
                                                ></v-text-field>
                                            </v-row>

                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-text-field
                                                    color="indigo lighten-1"
                                                    required
                                                    :rules="rules"
                                                    v-model="BookItem.autor"
                                                    label="Autor"
                                                    append-icon="mdi-book-edit"
                                                ></v-text-field>
                                            </v-row>

                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-select
                                                    v-model="BookItem.editora.id"
                                                    :items="publishers"
                                                    item-text="nome"
                                                    item-value="id"
                                                    color="indigo lighten-1"
                                                    :rules="rules"
                                                    label="Selecione a editora"
                                                    required
                                                ></v-select>
                                            </v-row>

                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-text-field
                                                    type="number"
                                                    color="indigo lighten-1"
                                                    required
                                                    :rules="rules"
                                                    v-model="BookItem.lancamento"
                                                    label="Ano de lançamento"
                                                    append-icon="mdi-calendar-range "
                                                ></v-text-field>
                                            </v-row>

                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-text-field
                                                    type="number"
                                                    color="indigo lighten-1"
                                                    required
                                                    :rules="rules"
                                                    v-model="BookItem.quantidade"
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
                <v-icon color="light-blue darken-2" class="edit-icon-table mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon color="red lighten-1" class="delete-icon-table" @click="OnClickDelete(item)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <span>Nada foi encontrado.</span>
            </template>
            <template v-slot:no-results>
                <span>Nada foi encontrado.</span>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import BookApi from '@/services/BookService';
import PublisherApi from '@/services/PublisherService';
import { showAlertToast, showAlertRemove, showAlertError } from '@/components/sweetalert';

export default {
    data: () => ({
        books: [],
        publishers: [],

        search: '',
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'ID', align: 'start', sortable: true, value: 'id' },
            { text: 'Nome', value: 'nome', align: 'start' },
            { text: 'Autor', value: 'autor', align: 'start' },
            { text: 'Editora', value: 'editora.nome', align: 'start' },
            { text: 'Lançamento', value: 'lancamento', align: 'start' },
            { text: 'Quantidade', value: 'quantidade', align: 'start' },
            { text: 'Total alugado', value: 'totalalugado', align: 'start' },
            { text: 'Ações', value: 'actions', sortable: false, align: 'center' }
        ],

        BookItem: {
            id: null,
            nome: '',
            editora: {
                id: null,
                cidade: '',
                nome: ''
            },
            autor: '',
            lancamento: '',
            quantidade: '',
            totalalugado: 0
        },

        defaultItem: {
            id: null,
            nome: '',
            editora: {
                id: null,
                cidade: '',
                nome: ''
            },
            autor: '',
            lancamento: '',
            quantidade: '',
            totalalugado: 0
        },

        rules: [(value) => !!value || 'Este campo é obrigatório.'],

        error: []
    }),

    mounted() {
        this.list();
        this.loadPublisherList();
    },

    methods: {
        list() {
            BookApi.list().then((resposta) => {
                this.books = resposta.data;
            });
        },

        loadPublisherList() {
            PublisherApi.list().then((resposta) => {
                this.publishers = resposta.data;
            });
        },

        save() {
            if (this.$refs.form.validate()) {
                BookApi.save(this.BookItem)
                    .then(() => {
                        this.close();
                        showAlertToast('success', 'Registro criado com sucesso.');
                        this.list();
                    })
                    .catch((error) => {
                        if (
                            error.response &&
                            error.response.status === 400 &&
                            error.response.data &&
                            error.response.data.error
                        ) {
                            if (error.response.data.error === 'lançamento não foi informado corretamente.') {
                                showAlertError('O ano é inválido.', 'Informe corretamente o campo lançamento.');
                            } else if (
                                error.response.data.error === 'Este livro já existe,tente novamente com outro nome!'
                            ) {
                                showAlertError(
                                    'Este livro já está cadastrado.',
                                    'Por favor, escolha outro nome e tente novamente.'
                                );
                            } else {
                                showAlertError(error.response.data.error);
                            }
                        }
                    });
            }
        },

        editItem(item) {
            this.BookItem = Object.assign({}, item);
            this.dialog = true;
        },

        close() {
            this.dialog = false;
            (this.BookItem = {
                id: null,
                nome: '',
                editora: {
                    id: null,
                    cidade: '',
                    nome: ''
                },
                autor: '',
                lancamento: '',
                quantidade: '',
                totalalugado: 0
            }),
                this.$refs.form.resetValidation();
        },

        deleteItemConfirm(item) {
            BookApi.delete(item)
                .then(() => {
                    showAlertToast('success', 'Registro deletado com sucesso.');
                    this.list();
                })
                .catch(() => {
                    showAlertError('Não foi possível apagar.', 'O livro possui aluguéis ativos.');
                });
        },

        onClickSave() {
            if (this.BookItem.id) {
                return this.edit(this.BookItem);
            }
            this.save(this.BookItem);
        },

        OnClickDelete(item) {
            showAlertRemove(() => this.deleteItemConfirm(item));
        },

        edit() {
            if (this.$refs.form.validate()) {
                BookApi.update(this.BookItem)
                    .then(() => {
                        this.close();
                        showAlertToast('success', 'Registro atualizado com sucesso.');
                        this.list();
                    })
                    .catch((error) => {
                        if (
                            error.response &&
                            error.response.status === 400 &&
                            error.response.data &&
                            error.response.data.error
                        ) {
                            if (error.response.data.error === 'lançamento não foi informado corretamente.') {
                                showAlertError('O ano é inválido.', 'Informe corretamente o campo lançamento.');
                            } else if (
                                error.response.data.error === 'Este livro já existe,tente novamente com outro nome!'
                            ) {
                                showAlertError(
                                    'Este livro já está cadastrado.',
                                    'Por favor, escolha outro nome e tente novamente.'
                                );
                            } else {
                                showAlertError(error.response.data.error);
                            }
                        }
                    });
            }
        }
    },

    computed: {
        formTitle() {
            return !this.BookItem.id ? 'Novo Livro' : 'Editar Livro';
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        }
    }
};
</script>

<style>
@import '../assets/styles/TableViews.css';
</style>
