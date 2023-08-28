<template>
    <div class="main-container">
        <v-data-table
            class="custom-table elevation-1"
            :search="search"
            :headers="headers"
            :items="formattedRentals"
            :footer-props="{ itemsPerPageText: 'Registros por página:', itemsPerPageAllText: 'Exibir tudo' }"
            :header-props="{ sortByText: 'Ordenar por' }"
            :options="tableOptions"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Aluguéis</v-toolbar-title>
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
                                <span class="text-h5 align-center font-weight-medium">Novo Aluguel</span>
                                <v-btn icon @click="close">
                                    <v-icon> mdi-close </v-icon>
                                </v-btn>
                            </v-card-title>
                            <v-card-text>
                                <v-form ref="form" lazy-validation>
                                    <v-row>
                                        <v-col>
                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-autocomplete
                                                    color="indigo lighten-1"
                                                    item-text="nome"
                                                    item-value="id"
                                                    v-model="RentalItem.livro_id.id"
                                                    :items="books"
                                                    label="Livro"
                                                    placeholder="Selecionar..."
                                                    required
                                                    :rules="rules.requerid"
                                                ></v-autocomplete>
                                            </v-row>
                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-autocomplete
                                                    color="indigo lighten-1"
                                                    item-text="nome"
                                                    item-value="id"
                                                    v-model="RentalItem.usuario_id.id"
                                                    :items="users"
                                                    label="Usuário"
                                                    placeholder="Selecionar..."
                                                    required
                                                    :rules="rules.requerid"
                                                ></v-autocomplete>
                                            </v-row>

                                            <v-row>
                                                <v-text-field
                                                    style="display: none"
                                                    type="date"
                                                    color="indigo lighten-1"
                                                    required
                                                    :rules="[rules.requerid, rules.postDate]"
                                                    v-model="RentalItem.data_previsao"
                                                    label="Previsão de Devolução"
                                                    :value="currentDate"
                                                    disabled
                                                ></v-text-field>
                                            </v-row>
                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-text-field
                                                    type="date"
                                                    color="indigo lighten-1"
                                                    required
                                                    :rules="[rules.requerid, rules.postDate]"
                                                    v-model="RentalItem.data_previsao"
                                                    label="Previsão de Devolução"
                                                ></v-text-field>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <v-card-actions>
                                        <div style="width: 100%" class="text-center">
                                            <v-btn color="indigo lighten-1" text @click="save"> Salvar </v-btn>
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

            <template v-slot:[`item.status`]="{ item }">
                <v-chip :color="item.statusColor">
                    <v-icon class="icon-status" left>{{ item.statusIcon }}</v-icon>
                    <span class="text-status">{{ item.statusText }}</span>
                </v-chip>
            </template>
            <template v-slot:[`item.data_devolucao`]="{ item }">
                <div>
                    <v-chip v-if="item.data_devolucao === 'Pendente'" color="yellow lighten-4">
                        <v-icon class="icon-status" left>mdi-alert-circle-outline</v-icon>
                        <strong>Pendente</strong></v-chip
                    >
                    <span v-else>{{ item.data_devolucao }}</span>
                </div>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
                <span>
                    <v-icon
                        :color="getColorAction(icon)"
                        v-for="icon in getAction(item)"
                        :key="icon"
                        @click="
                            icon === 'mdi-book' ? returnBook(item) : icon === 'mdi-delete' ? OnClickDelete(item) : null
                        "
                    >
                        {{ icon }}
                    </v-icon>
                </span>
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
import RentalApi from '@/services/RentalService';
import BookApi from '@/services/BookService';
import UserApi from '@/services/UserService';
import { showAlertToast, showAlertRemove, showAlertError, showAlertReturn } from '@/components/sweetalert';
import moment from 'moment';
import 'moment/locale/pt-br';

export default {
    data: () => ({
        currentDate: new Date().toISOString().substr(0, 10),

        rentals: [],
        books: [],
        users: [],

        tableOptions: {
            sortBy: ['id'],
            sortDesc: [true]
        },
        search: '',
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'ID', align: 'start', sortable: true, value: 'id' },
            { text: 'Livro', value: 'livro_id.nome', align: 'start' },
            { text: 'Usuário', value: 'usuario_id.nome', align: 'start' },
            { text: 'Data do Aluguel', value: 'data_aluguel', align: 'start' },
            { text: 'Previsão de Devolução', value: 'data_previsao', align: 'start' },
            { text: 'Data da Devolução', value: 'data_devolucao', align: 'center' },
            { text: 'Status', value: 'status', align: 'center' },
            { text: 'Ações', value: 'actions', sortable: false, align: 'center' }
        ],
        RentalItem: {
            livro_id: {
                autor: '',
                editora: {
                    cidade: '',
                    id: 0,
                    nome: ''
                },
                id: null,
                lancamento: 0,
                nome: '',
                quantidade: 0,
                totalalugado: 0
            },
            usuario_id: {
                cidade: '',
                email: '',
                endereco: '',
                id: null,
                nome: ''
            },
            data_aluguel: '',
            data_previsao: '',
            data_devolucao: ''
        },
        rules: {
            requerid: (value) => !!value || 'Este campo é obrigatório.'
        },
        error: []
    }),

    computed: {
        formattedRentals() {
            return this.rentals.map((rental) => {
                const statusText = this.getStatusText(rental.data_devolucao, rental.data_previsao);

                return {
                    ...rental,
                    data_aluguel: rental.data_aluguel.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1'),
                    data_previsao: rental.data_previsao.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1'),
                    data_devolucao: rental.data_devolucao
                        ? rental.data_devolucao.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1')
                        : 'Pendente',
                    statusText: statusText,
                    statusColor: this.getStatusColor(rental.data_devolucao, rental.data_previsao),
                    statusIcon: this.getStatusIcon(rental.data_devolucao, rental.data_previsao),
                    status: statusText
                };
            });
        }
    },
    watch: {
        dialog(val) {
            val || this.close();
        }
    },
    mounted() {
        this.list();
        this.loadBookList();
        this.loadUserList();
    },

    methods: {
        list() {
            RentalApi.list().then((resposta) => {
                this.rentals = resposta.data;
            });
        },
        loadBookList() {
            BookApi.list().then((resposta) => {
                this.books = resposta.data;
            });
        },

        loadUserList() {
            UserApi.list().then((resposta) => {
                this.users = resposta.data;
            });
        },

        save() {
            this.RentalItem.data_aluguel = this.currentDate;
            this.data_aluguel = moment(new Date()).format('YYYY-MM-DD');
            this.data_previsao = moment(new Date()).format('YYYY-MM-DD');

            if (this.$refs.form.validate()) {
                RentalApi.save(this.RentalItem)
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
                            if (error.response.data.error == 'Bad Request') {
                                showAlertError('Ops!', 'Informe as datas corretamente.');
                            } else if (
                                error.response.data.error == 'A data de aluguel deve ser a data atual: 2023-08-19'
                            ) {
                                showAlertError('Ops!', 'A data do aluguel deve ser igual a data atual');
                            } else {
                                showAlertError('Algo deu errado', error.response.data.error);
                            }
                        }
                    });
            }
        },

        close() {
            this.dialog = false;

            (this.RentalItem = {
                livro_id: {
                    autor: '',
                    editora: {
                        cidade: '',
                        id: 0,
                        nome: ''
                    },
                    id: null,
                    lancamento: 0,
                    nome: '',
                    quantidade: 0,
                    totalalugado: 0
                },
                usuario_id: {
                    cidade: '',
                    email: '',
                    endereco: '',
                    id: null,
                    nome: ''
                },
                data_aluguel: '',
                data_previsao: '',
                data_devolucao: ''
            }),
                this.$refs.form.resetValidation();
        },

        deleteItemConfirm(item) {
            item.data_aluguel = moment(new Date()).format('YYYY-MM-DD');
            item.data_previsao = moment(new Date()).format('YYYY-MM-DD');
            if (item.data_devolucao !== 'Pendente') {
                item.data_devolucao = moment(new Date()).format('YYYY-MM-DD');
            } else if (item.data_devolucao === 'Pendente') {
                item.data_devolucao = null;
            }

            RentalApi.delete(item)
                .then(() => {
                    showAlertToast('success', 'Registro deletado com sucesso.');
                    this.list();
                })
                .catch((error) => {
                    this.error = error.response.data;
                    showAlertError(error);
                });
        },

        OnClickDelete(item) {
            showAlertRemove(() => this.deleteItemConfirm(item));
        },

        returnBookConfirm(item) {
            item.data_aluguel = moment(new Date()).format('YYYY-MM-DD');
            item.data_previsao = moment(new Date()).format('YYYY-MM-DD');
            item.data_devolucao = moment(new Date()).format('YYYY-MM-DD');

            RentalApi.update(item)
                .then(() => {
                    showAlertToast('success', 'Registro atualizado com sucesso.');
                    this.list();
                })
                .catch((error) => {
                    this.error = error.response.data;
                });
        },
        returnBook(item) {
            showAlertReturn(() => this.returnBookConfirm(item));
        },

        getAction(item) {
            const devolution = item.data_devolucao;

            if (devolution !== 'Pendente') {
                return '';
            } else if (devolution === 'Pendente') {
                return ['mdi-book', 'mdi-delete'];
            }
        },

        getColorAction(icon) {
            if (icon === 'mdi-book') {
                return 'green';
            } else if (icon === 'mdi-delete') {
                return 'red';
            } else {
                return '';
            }
        },

        getStatusText(dataDevolucao, dataPrevisao) {
            const today = new Date().toISOString().substr(0, 10);
            const devolution = dataDevolucao ? dataDevolucao : '';
            const forecast = dataPrevisao;

            if (devolution !== '' && devolution > forecast) {
                return 'Atrasado';
            } else if (devolution !== '' && devolution <= forecast) {
                return 'No prazo';
            } else if (devolution === '' && today > forecast) {
                return 'Atrasado';
            } else {
                return 'No prazo';
            }
        },

        getStatusColor(dataDevolucao, dataPrevisao) {
            const today = new Date().toISOString().substr(0, 10);

            const devolution = dataDevolucao ? dataDevolucao : '';
            const forecast = dataPrevisao;

            if (devolution !== '' && devolution > forecast) {
                return 'red lighten-2';
            } else if (devolution !== '' && devolution <= forecast) {
                return 'green lighten-2';
            } else if (devolution === '' && today > forecast) {
                return 'yellow lighten-2';
            } else {
                return 'blue lighten-3';
            }
        },

        getStatusIcon(dataDevolucao, dataPrevisao) {
            const devolution = dataDevolucao ? dataDevolucao : '';
            const forecast = dataPrevisao;

            if (devolution !== '' && devolution > forecast) {
                return 'mdi-book-alert';
            } else if (devolution !== '' && devolution <= forecast) {
                return 'mdi-book-check';
            } else {
                return 'mdi-timer-sand';
            }
        }
    }
};
</script>

<style>
@import '../assets/styles/TableViews.css';
@import '../assets/styles/RentalView.css';
</style>
