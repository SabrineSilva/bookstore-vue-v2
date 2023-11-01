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
                                <div class="dialog-header">
                                    <span class="text-h5 form-title font-weight-medium">{{ formTitle }}</span>

                                    <v-btn class="close-icon" icon @click="close">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </div>
                            </v-card-title>
                            <v-card-text>
                                <v-form ref="form" lazy-validation>
                                    <v-row>
                                        <v-col>
                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-autocomplete
                                                    color="indigo lighten-1"
                                                    item-text="name"
                                                    item-value="id"
                                                    v-model="rentalItem.bookId"
                                                    :items="calculateAvailableBooks()"
                                                    label="Livro"
                                                    placeholder="Selecionar..."
                                                    required
                                                    :rules="rules"
                                                    :disabled="isEditing"
                                                    no-data-text="Nenhum resultado encontrado"
                                                >
                                                    <template v-slot:item="{ item }">
                                                        <v-list-item-content>
                                                            <v-list-item-title v-html="item.name"> </v-list-item-title>
                                                            <v-list-item-subtitle
                                                                v-html="item.author"
                                                            ></v-list-item-subtitle>
                                                            <v-list-item-subtitle
                                                                v-html="item.publisherName"
                                                            ></v-list-item-subtitle>
                                                        </v-list-item-content>
                                                    </template>
                                                </v-autocomplete>
                                            </v-row>
                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-autocomplete
                                                    color="indigo lighten-1"
                                                    item-text="name"
                                                    item-value="id"
                                                    v-model="rentalItem.userId"
                                                    :items="users"
                                                    label="Cliente"
                                                    placeholder="Selecionar..."
                                                    required
                                                    :rules="rules"
                                                    :disabled="isEditing"
                                                    no-data-text="Nenhum resultado encontrado"
                                                >
                                                    <template v-slot:item="{ item }">
                                                        <v-list-item-content>
                                                            <v-list-item-title v-html="item.name"></v-list-item-title>
                                                            <v-list-item-subtitle
                                                                v-html="item.email"
                                                            ></v-list-item-subtitle>
                                                        </v-list-item-content>
                                                    </template>
                                                </v-autocomplete>
                                            </v-row>

                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-text-field
                                                    type="date"
                                                    color="indigo lighten-1"
                                                    required
                                                    :rules="rules"
                                                    v-model="rentalItem.deadline"
                                                    label="Previsão de Devolução"
                                                    :min="isEditingDate"
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
                <!-- <v-toolbar flat class="mb-5">
                    <template>
                        <v-tabs v-model="model" centered slider-color="indigo">
                            <v-tab @click="listAll()"> Todos </v-tab>
                            <v-tab @click="listPending()"> Pendentes </v-tab>
                            <v-tab @click="listReturned()"> Devolvidos </v-tab>
                        </v-tabs>
                    </template>
                </v-toolbar> -->
            </template>

            <template v-slot:[`item.status`]="{ item }">
                <v-chip :color="item.statusColor">
                    <span class="text-status">{{ item.statusText }}</span>
                </v-chip>
            </template>
            <template v-slot:[`item.returnDate`]="{ item }">
                <div>
                    <v-chip v-if="item.returnDate === 'Pendente'" color="indigo lighten-5">
                        <strong>Pendente</strong></v-chip
                    >
                    <span v-else>{{ item.returnDate }}</span>
                </div>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
                <div class="action-column">
                    <v-tooltip top v-if="getAction(item) && getAction(item).length > 0">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon
                                v-bind="attrs"
                                v-on="on"
                                class="icon-table mr-2"
                                :color="getColorAction(icon)"
                                v-for="icon in getAction(item)"
                                :key="icon"
                                @click="
                                    icon === 'mdi-book'
                                        ? returnBook(item)
                                        : icon === 'mdi-timer-plus-outline'
                                        ? updateItem(item)
                                        : null
                                "
                                @mouseenter="tooltipText = getTooltipText(icon)"
                                @mouseleave="tooltipText = ''"
                            >
                                {{ icon }}
                            </v-icon>
                        </template>
                        <span>{{ tooltipText }}</span>
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
                            <span class="text-subtitle-1 font-weight-medium"> Detalhes desse aluguel: </span>
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
                                        <th class="text-left">Última vez atualizado</th>
                                    </tr>
                                    <tr>
                                        <td>{{ formatDateTime(rental.createdAt) }}</td>
                                        <td>{{ formatDateTime(rental.updatedAt) }}</td>
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
import RentalApi from '@/services/RentalService';
import BookApi from '@/services/BookService';
import UserApi from '@/services/UserService';
import { showAlertToast, showAlertError, showAlertReturn } from '@/components/sweetalert';
import { format, utcToZonedTime } from 'date-fns-tz';
import moment from 'moment';
import 'moment/locale/pt-br';

export default {
    data: () => ({
        rentals: [],
        rental: [],
        returnedRentals: [],
        pendingRentals: [],
        books: [],
        users: [],
        error: [],

        dialog: false,
        showInfoDialog: false,
        isEditing: false,
        isEditingDate: new Date().toISOString().substr(0, 10),
        currentDate: new Date().toISOString().substr(0, 10),
        tooltipText: '',
        search: '',

        rules: [(value) => !!value || 'Este campo é obrigatório'],
        model: 'tab-2',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor i',

        headers: [
            { text: 'ID', value: 'id', sortable: true, align: 'start' },
            { text: 'Livro', value: 'bookName', align: 'start' },
            { text: 'Cliente', value: 'userName', align: 'start' },
            { text: 'Data do Aluguel', value: 'rentalDate', align: 'start' },
            { text: 'Previsão de Devolução', value: 'deadline', align: 'start' },
            { text: 'Data da Devolução', value: 'returnDate', align: 'start' },
            { text: 'Status', value: 'status', align: 'center' },
            { text: 'Ações', value: 'actions', sortable: false, align: 'center' }
        ],

        rentalItem: {
            id: null,
            bookid: null,
            userid: null,
            rentalDate: '',
            deadline: '',
            returnDate: '',
            status: 'RETURNED_ON_TIME'
        },

        tableOptions: {
            sortBy: ['id'],
            sortDesc: [true]
        }
    }),

    computed: {
        formattedRentals() {
            return this.rentals.map((rental) => {
                const statusText = this.getStatusText(rental.status);
                return {
                    ...rental,
                    rentalDate: rental.rentalDate.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1'),
                    deadline: rental.deadline.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1'),
                    returnDate: rental.returnDate
                        ? rental.returnDate.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1')
                        : 'Pendente',
                    statusText: statusText,
                    statusColor: this.getStatusColor(rental.status),
                    status: statusText
                };
            });
        },
        formTitle() {
            return !this.rentalItem.id ? 'Novo Aluguel' : 'Estender o prazo';
        }
    },
    watch: {
        dialog(val) {
            val || this.close();
        }
    },
    mounted() {
        this.listAll();
        this.loadBookList();
        this.loadUserList();
    },

    methods: {
        listAll() {
            RentalApi.listAll().then((response) => {
                this.rentals = response.data;
            });
        },

        listPending() {
            RentalApi.listPending().then((response) => {
                this.rentals = response.data;
            });
        },

        listReturned() {
            RentalApi.listReturned().then((response) => {
                this.rentals = response.data;
            });
        },

        loadBookList() {
            BookApi.listAll().then((response) => {
                this.books = response.data;
            });
        },

        loadUserList() {
            UserApi.listAll().then((response) => {
                this.users = response.data;
            });
        },

        create() {
            this.rentalItem.rentalDate = this.currentDate;
            this.rentalDate = moment(new Date()).format('YYYY-MM-DD');
            this.deadline = moment(new Date()).format('YYYY-MM-DD');

            if (this.$refs.form.validate()) {
                RentalApi.create(this.rentalItem)
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

        close() {
            this.dialog = false;
            this.isEditing = false;
            this.isEditingDate = new Date().toISOString().substr(0, 10);
            (this.rentalItem = {
                id: null,
                bookid: null,
                userid: null,
                rentalDate: '',
                deadline: '',
                returnDate: '',
                status: 'RETURNED_ON_TIME'
            }),
                this.$refs.form.resetValidation();
        },

        returnBookConfirm(item) {
            RentalApi.returnBook(item.id)
                .then(() => {
                    showAlertToast('success', 'Aluguel devolvido com sucesso.');
                    this.listAll();
                })
                .catch((error) => {
                    showAlertError('Ops', error.response.data.message);
                });
        },
        returnBook(item) {
            showAlertReturn(() => this.returnBookConfirm(item));
        },

        getAction(item) {
            const status = item.status;
            const returnDate = item.returnDate;

            if (status === 'No prazo' && returnDate === 'Pendente') {
                return ['mdi-timer-plus-outline', 'mdi-book'];
            } else if (status === 'Em atraso' && returnDate === 'Pendente') {
                return ['mdi-book'];
            } else {
                return '';
            }
        },

        getColorAction(icon) {
            if (icon === 'mdi-book') {
                return 'green';
            } else if (icon === 'mdi-timer-plus-outline') {
                return 'blue';
            } else {
                return '';
            }
        },

        getStatusText(status) {
            if (status === 'RETURNED_LATE') {
                return 'Em atraso';
            } else if (status === 'RETURNED_ON_TIME') {
                return 'No prazo';
            } else if (status === 'PENDING_LATE') {
                return 'Em atraso';
            } else {
                return 'No prazo';
            }
        },

        getStatusColor(status) {
            if (status === 'RETURNED_LATE' || status === 'PENDING_LATE') {
                return 'red accent-1';
            } else if (status === 'RETURNED_ON_TIME' || status === 'PENDING_ON_TIME') {
                return 'light-green lighten-2';
            } else {
                return '';
            }
        },

        formatDateTime(dateTime) {
            if (dateTime) {
                const zonedDateTime = utcToZonedTime(dateTime, 'America/Sao_Paulo');
                return format(zonedDateTime, 'dd/MM/yyyy HH:mm:ss', { timeZone: 'America/Sao_Paulo' });
            }
            return '';
        },

        onClickSave() {
            if (this.rentalItem.id) {
                return this.increaseDeadline(this.rentalItem);
            }
            this.create(this.rentalItem);
        },

        updateItem(item) {
            this.rentalItem = {
                id: item.id,
                bookId: null,
                userId: null,
                rentalDate: item.rentalDate,
                deadline: moment(item.deadline, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                returnDate: item.returnDate,
                status: item.status
            };

            const selectedBook = this.books.find((book) => book.name === item.bookName);
            const selectedUser = this.users.find((user) => user.name === item.userName);

            if (selectedBook && selectedUser) {
                this.rentalItem.bookId = selectedBook.id;
                this.rentalItem.userId = selectedUser.id;
            }

            this.dialog = true;
            this.isEditing = true;
            this.isEditingDate = moment(item.deadline, 'DD/MM/YYYY').format('YYYY-MM-DD');
        },

        increaseDeadline() {
            if (this.$refs.form.validate()) {
                RentalApi.increaseDeadline(this.rentalItem)
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

        getTooltipText(icon) {
            if (icon === 'mdi-book') {
                return 'Devolver Livro';
            } else if (icon === 'mdi-timer-plus-outline') {
                return 'Estender o Prazo';
            }
            return '';
        },

        findById(item) {
            RentalApi.findById(item.id).then((response) => {
                this.rental = response.data;
            });
        },

        openInfoDialog(item) {
            this.findById(item);
            this.showInfoDialog = true;
        },

        calculateAvailableBooks() {
            const availableBooks = this.books.filter((book) => book.availableQuantity > 0);
            return availableBooks;
        }
    }
};
</script>

<style>
@import '../assets/styles/TableViews.css';
@import '../assets/styles/RentalView.css';
</style>
