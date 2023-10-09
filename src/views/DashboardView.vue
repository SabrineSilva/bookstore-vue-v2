<template>
    <div class="container-dashboard ml-3 mr-3">
        <v-card-title class="text-h6 text-md-h5 text-lg-h4"><strong>Dashboard</strong></v-card-title>
        <v-row>
            <v-col>
                <v-item-group mandatory>
                    <div style="display: flex; justify-content: start">
                        <v-icon color="#0a4f78" class="ml-1">mdi-information-slab-circle</v-icon>
                        <v-card-title>Registros do Sistema</v-card-title>
                    </div>
                    <v-row justify="start" class="space">
                        <v-col>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-item>
                                        <v-card
                                            v-bind="attrs"
                                            v-on="on"
                                            elevation="2"
                                            class="d-flex align-center rounded-xl image"
                                            height="170"
                                            to="/Rental"
                                        >
                                            <v-row>
                                                <v-col sm="12">
                                                    <v-list-item three-line class="mt-3">
                                                        <v-list-item-content>
                                                            <div class="mb-4">
                                                                <v-icon x-large color="white">mdi-book-account</v-icon>
                                                            </div>

                                                            <v-list-item-title class="headline mb-1 white--text">
                                                                <strong>{{ totalRentals }}</strong>
                                                            </v-list-item-title>
                                                            <v-list-item-subtitle class="white--text"
                                                                >Aluguéis</v-list-item-subtitle
                                                            >
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-item>
                                </template>
                                <span>Clique para acessar os Aluguéis.</span>
                            </v-tooltip>
                        </v-col>

                        <v-col>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-item>
                                        <v-card
                                            v-bind="attrs"
                                            v-on="on"
                                            elevation="1"
                                            class="d-flex align-center rounded-xl image2"
                                            height="170"
                                            to="/Book"
                                        >
                                            <v-row>
                                                <v-col sm="12">
                                                    <v-list-item three-line class="mt-3">
                                                        <v-list-item-content>
                                                            <div class="mb-4">
                                                                <v-icon elevation="1" x-large color="white"
                                                                    >mdi-book</v-icon
                                                                >
                                                            </div>

                                                            <v-list-item-title class="headline mb-1 white--text">
                                                                <strong>{{ totalBooks }}</strong>
                                                            </v-list-item-title>
                                                            <v-list-item-subtitle class="white--text"
                                                                >Livros</v-list-item-subtitle
                                                            >
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-item>
                                </template>
                                <span>Clique para acessar os Livros.</span>
                            </v-tooltip>
                        </v-col>
                        <v-col>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-item>
                                        <v-card
                                            v-bind="attrs"
                                            v-on="on"
                                            elevation="1"
                                            class="d-flex align-center rounded-xl image3"
                                            height="170"
                                            to="/User"
                                        >
                                            <v-row>
                                                <v-col sm="12">
                                                    <v-list-item three-line class="mt-3">
                                                        <v-list-item-content>
                                                            <div class="mb-4">
                                                                <v-icon elevation="1" x-large color="white"
                                                                    >mdi-account</v-icon
                                                                >
                                                            </div>

                                                            <v-list-item-title class="headline mb-1 white--text">
                                                                <strong>{{ totalUsers }}</strong>
                                                            </v-list-item-title>
                                                            <v-list-item-subtitle class="white--text"
                                                                >Usuários</v-list-item-subtitle
                                                            >
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-item>
                                </template>
                                <span>Clique para acessar os Usuários</span>
                            </v-tooltip>
                        </v-col>
                        <v-col>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-item>
                                        <v-card
                                            v-bind="attrs"
                                            v-on="on"
                                            elevation="1"
                                            class="d-flex align-center rounded-xl image4"
                                            height="170"
                                            to="/Publisher"
                                        >
                                            <v-row>
                                                <v-col sm="12">
                                                    <v-list-item three-line class="mt-3">
                                                        <v-list-item-content>
                                                            <div class="mb-4">
                                                                <v-icon elevation="1" x-large color="white"
                                                                    >mdi-city</v-icon
                                                                >
                                                            </div>

                                                            <v-list-item-title class="headline mb-1 white--text">
                                                                <strong>{{ totalPublishers }}</strong>
                                                            </v-list-item-title>
                                                            <v-list-item-subtitle class="white--text"
                                                                >Editoras</v-list-item-subtitle
                                                            >
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-item>
                                </template>
                                <span>Clique para acessar as Editoras.</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>
                </v-item-group>
            </v-col>
        </v-row>

        <v-row class="mt-6">
            <v-col md="6">
                <div class="mb-1">
                    <v-icon color="green" class="mr-3 mb-1">mdi-book-check</v-icon>
                    <span class="text-toolbar-title text-h6 text-md-h6">Últimos Aluguéis</span>

                    <v-btn color="#6994c7" text class="ml-5" to="/User">Ver todos</v-btn>
                </div>
                <v-card class="rounded-lg">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">Livro</th>
                                    <th class="text-left">Usuário</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(rental, index) in latestRentals" :key="index">
                                    <td>{{ rental.livro_id.nome }}</td>
                                    <td>{{ rental.usuario_id.nome }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
            </v-col>
            <v-col>
                <template>
                    <div class="chart">
                        <div class="toolbar-chart">
                            <v-icon color="indigo" class="mr-2">mdi-book-heart</v-icon>
                            <span class="text-h6 text-md-h6">Os 5 livros mais alugados</span>
                        </div>

                        <Bar
                            :chart-options="chartOptions"
                            :chart-data="chartData"
                            :chart-id="chartId"
                            :dataset-id-key="datasetIdKey"
                            :plugins="plugins"
                            :css-classes="cssClasses"
                            :styles="styles"
                            :width="width"
                            :height="height"
                        />
                    </div>
                </template>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <div class="custom-container">
                    <v-toolbar color="rgba(0,0,0,0)" flat>
                        <v-icon color="red darken-3" class="mr-3"> mdi-timer-alert </v-icon>
                        <v-toolbar-title>Locações em Atraso ({{ formattedRentals.length }})</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn color="#6994c7" text class="ml-5" to="/Rental">Ver todos</v-btn>
                    </v-toolbar>

                    <v-data-table
                        sort-by="id"
                        :headers="headers"
                        :items="formattedRentals"
                        :itemsPerPage="5"
                        :footer-props="{
                            itemsPerPageText: 'Registros por página:',
                            itemsPerPageAllText: 'Exibir tudo'
                        }"
                        :header-props="{ sortByText: 'Ordenar por' }"
                    >
                        <template v-slot:[`item.status`]="{ item }">
                            <span class="text-status">{{ item.statusText }}</span>
                        </template>
                    </v-data-table>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import BookApi from '@/services/BookService';
import RentalApi from '@/services/RentalService';
import UserApi from '@/services/UserService';
import PublisherApi from '@/services/PublisherService';
import { Bar } from 'vue-chartjs/legacy';

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
    name: 'BarChart',
    components: {
        Bar
    },
    props: {
        chartId: {
            type: String,
            default: 'bar-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 400
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => {}
        },
        plugins: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({
        rentals: [],
        rentalsForStatus: [],
        books: [],
        latestBooks: [],
        latestRentals: [],
        totalAtraso: 0,
        totalBooks: 0,
        totalRentals: 0,
        totalPublishers: 0,
        totalUsers: 0,
        headers: [
            { text: 'ID', align: 'start', sortable: true, value: 'id' },
            { text: 'Livro', value: 'livro_id.nome', align: 'start' },
            { text: 'Usuário', value: 'usuario_id.nome', align: 'start' },
            { text: 'Data do Aluguel', value: 'data_aluguel', align: 'start' },
            { text: 'Previsão de Devolução', value: 'data_previsao', align: 'start' },
            { text: 'Data da Devolução', value: 'data_devolucao', align: 'center' },
            { text: 'Status', value: 'status', align: 'center' }
        ],
        chartData: {
            datasets: [
                {
                    label: 'Quantidade de aluguéis',
                    backgroundColor: ['#b196ff', '#a096ff', '#96c3ff', '#96f4ff', '#79d9b1'],
                    data: []
                }
            ]
        },
        chartOptions: {
            responsive: true,
            maintainAspectRatio: false,

            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    }),
    computed: {
        formattedRentals() {
            return this.rentals
                .filter((rental) => {
                    const statusText = this.getStatusText(rental.data_devolucao, rental.data_previsao);
                    return statusText === 'Atrasado';
                })
                .map((rental) => {
                    const statusText = this.getStatusText(rental.data_devolucao, rental.data_previsao);
                    const formattedRental = {
                        ...rental,
                        data_aluguel: rental.data_aluguel.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1'),
                        data_previsao: rental.data_previsao.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1'),
                        data_devolucao: rental.data_devolucao
                            ? rental.data_devolucao.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1')
                            : null,
                        statusText: statusText
                    };

                    return formattedRental;
                });
        }
    },
    mounted() {
        this.loadLatestBooks();
        this.loadLatestRentals();
        this.calculateTotalBooks();
        this.calculateTotalRentals();
        this.calculateTotalUsers();
        this.calculateTotalPublishers();
        this.listRentals();
        this.getBooks();
    },

    methods: {
        getBooks() {
            BookApi.list()
                .then((resposta) => {
                    this.books = resposta.data;
                    const sortedBooks = this.books
                        .filter((book) => book.totalalugado > 0)
                        .sort((a, b) => b.totalalugado - a.totalalugado)
                        .slice(0, 5);

                    const labels = sortedBooks.map((book) => book.nome);
                    const data = sortedBooks.map((book) => book.totalalugado);

                    this.chartData.labels = labels;
                    this.chartData.datasets[0].data = data;
                })
                .catch((error) => {
                    console.error('Error fetching books:', error);
                });
        },
        loadLatestBooks() {
            BookApi.list()
                .then((response) => {
                    const allBooks = response.data;
                    const sortedBooks = allBooks.sort((a, b) => b.id - a.id);
                    this.latestBooks = sortedBooks.slice(0, 4);
                })
                .catch((error) => {
                    console.error('Error fetching latest books:', error);
                });
        },

        loadLatestRentals() {
            RentalApi.list()
                .then((response) => {
                    const allRentals = response.data;
                    const sortedRentals = allRentals.sort((a, b) => b.id - a.id);
                    this.latestRentals = sortedRentals.slice(0, 6);
                })
                .catch((error) => {
                    console.error('Error fetching latest books:', error);
                });
        },

        calculateRentals() {
            RentalApi.list()
                .then((response) => {
                    this.rentalsForStatus = response.data;
                })
                .catch((error) => {
                    console.error('Error fetching rentals:', error);
                });
        },
        calculateTotalRentals() {
            RentalApi.list()
                .then((response) => {
                    this.totalRentals = response.data.length;
                })
                .catch((error) => {
                    console.error('Error fetching rentals:', error);
                });
        },
        calculateTotalBooks() {
            BookApi.list()
                .then((response) => {
                    this.totalBooks = response.data.length;
                })
                .catch((error) => {
                    console.error('Error fetching books:', error);
                });
        },
        calculateTotalUsers() {
            UserApi.list()
                .then((response) => {
                    this.totalUsers = response.data.length;
                })
                .catch((error) => {
                    console.error('Error fetching users:', error);
                });
        },
        calculateTotalPublishers() {
            PublisherApi.list()
                .then((response) => {
                    this.totalPublishers = response.data.length;
                })
                .catch((error) => {
                    console.error('Error fetching publishers:', error);
                });
        },

        listRentals() {
            RentalApi.list()
                .then((response) => {
                    this.rentals = response.data;
                })
                .catch((error) => {
                    console.error('Error fetching rentals:', error);
                });
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
        }
    }
};
</script>

<style>
@import '../assets/styles/DashboardView.css';
</style>
