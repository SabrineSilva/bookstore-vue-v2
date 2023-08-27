<template>
    <div class="main-container">
        <!-- Tabela de dados usando Vuetify -->
        <v-data-table
            sort-by="id"
            :search="search"
            :headers="headers"
            :items="users"
            class="elevation-1 custom-table"
            :footer-props="{ itemsPerPageText: 'Registros por página:', itemsPerPageAllText: 'Exibir tudo' }"
            :header-props="{ sortByText: 'Ordenar por' }"
        >
            <!-- Slot personalizado para a barra de ferramentas -->
            <template v-slot:top>
                <v-toolbar flat>
                    <!-- Título da página -->
                    <v-toolbar-title>Usuários</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>

                    <!-- Diálogo para adicionar/editar -->
                    <v-dialog persistent v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <!-- Botão de adição -->
                            <v-btn elevation="3" color="indigo lighten-1" v-bind="attrs" v-on="on" fab dark small>
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <v-card class="add-form rounded-xl pa-3">
                            <!-- Título do formulário -->

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
                                            <!-- Campos de entrada -->
                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-text-field
                                                    color="indigo lighten-1"
                                                    required
                                                    :rules="rules"
                                                    v-model="userItem.nome"
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
                                                    v-model="userItem.cidade"
                                                    label="Cidade"
                                                    append-icon="mdi-home-city"
                                                ></v-text-field>
                                            </v-row>
                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-text-field
                                                    color="indigo lighten-1"
                                                    required
                                                    :rules="rules"
                                                    v-model="userItem.endereco"
                                                    label="Endereço"
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

                    <!-- Campo de pesquisa -->
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Pesquisar"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-toolbar>
            </template>

            <!-- Slot personalizado para as ações na tabela -->
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

<!-- Código do componente Vue -->
<script>
import UserApi from '@/services/UserService';
import { showAlertToast, showAlertRemove, showAlertError } from '@/components/Toast';

export default {
    data: () => ({
        // Array de todos os elementos da tabela
        users: [],
        // Dados do componente
        search: '',
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'ID', align: 'start', sortable: true, value: 'id' },
            { text: 'Nome', value: 'nome', align: 'start' },
            { text: 'E-mail', value: 'email', align: 'start' },
            { text: 'Cidade', value: 'cidade', align: 'start' },
            { text: 'Endereço', value: 'endereco', align: 'start' },
            { text: 'Ações', value: 'actions', sortable: false, align: 'center' }
        ],
        // Array do elemento único
        userItem: {
            id: null,
            nome: '',
            email: '',
            cidade: '',
            endereco: ''
        },
        // Regras para a validação
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

        // Erros
        error: []
    }),

    mounted() {
        this.list();
    },

    methods: {
        list() {
            UserApi.list().then((resposta) => {
                this.users = resposta.data;
            });
        },

        // Função para salvar/editar um item na tabela
        save() {
            if (this.$refs.form.validate()) {
                UserApi.save(this.userItem)
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
                            showAlertError('Algo deu errado', error.response.data.error);
                        }
                    });
            }
        },
        // Função para editar um item da tabela
        editItem(item) {
            this.userItem = Object.assign({}, item);
            this.dialog = true;
        },

        // Função para fechar o diálogo de adição/edção - DO VUETIFY
        close() {
            this.dialog = false;
            this.userItem = {
                id: null,
                nome: '',
                email: '',
                cidade: '',
                endereco: ''
            };
            this.$refs.form.resetValidation();
        },

        // Deletando um item da tabela
        deleteItemConfirm(item) {
            UserApi.delete(item)
                .then(() => {
                    showAlertToast('success', 'Registro deletado com sucesso.');
                    this.list();
                })
                .catch(() => {
                    showAlertError('Não foi possível apagar.', 'O Usuário possui associação com algum livro.');
                });
        },

        onClickSave() {
            if (this.userItem.id) {
                return this.edit(this.userItem);
            }
            this.save(this.userItem);
        },

        OnClickDelete(item) {
            showAlertRemove(() => this.deleteItemConfirm(item));
        },

        edit() {
            if (this.$refs.form.validate()) {
                UserApi.update(this.userItem)
                    .then(() => {
                        this.close();
                        showAlertToast('success', 'Registro atualizado com sucesso.');
                        this.list();
                        this.$refs.form.resetValidation();
                    })
                    .catch((error) => {
                        if (
                            error.response &&
                            error.response.status === 400 &&
                            error.response.data &&
                            error.response.data.error
                        ) {
                            showAlertError('Algo deu errado', error.response.data.error);
                        }
                    });
            }
        }
    },

    computed: {
        // Título dinâmico para o formulário de edição/adicão
        formTitle() {
            return !this.userItem.id ? 'Novo Usuário' : 'Editar Usuário';
        }
    },

    watch: {
        // Fechar diálogo de adição/editação quando 'dialog' muda para false
        dialog(val) {
            val || this.close();
        }
    }
};
</script>

<!-- Estilos CSS -->
<style>
@import '../assets/styles/TableViews.css';
</style>
