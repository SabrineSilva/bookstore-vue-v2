<template>
    <div style="margin-top: 0px" class="container-dashboard ml-3 mr-3">
        <v-card-title class="text-h6 text-md-h5 text-lg-h4" style="padding-bottom: 0px; padding-left: 0px"
            ><strong>Dashboard</strong></v-card-title
        >
        <v-row>
            <v-col>
                <v-item-group mandatory>
                    <div style="display: flex; justify-content: start">
                        <v-icon color="#0a4f78">mdi-information-slab-circle</v-icon>
                        <v-card-title style="padding-left: 10px">Registros do Sistema</v-card-title>
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
        <v-row>
            <v-col>
                <v-col>
                    <div class="mb-1">
                        <v-icon color="green" class="mr-3 mb-1">mdi-podium</v-icon>
                        <span class="text-toolbar-title text-h6 text-md-h6">Melhores Leitores</span>

                        <v-btn color="#6994c7" text class="ml-5" to="/User">Ver todos</v-btn>
                    </div>
                    <v-card class="rounded-lg">
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">Cliente</th>
                                        <th class="text-left">E-mail</th>
                                        <th class="text-left">Quantidade de aluguéis</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="user in bestCustomers" :key="user.id">
                                        <td>
                                            <v-list-item-title>{{ user.name }}</v-list-item-title>
                                        </td>
                                        <td class="subtitle-text">{{ user.email }}</td>
                                        <td>
                                            <strong>{{ user.numberOfRentals }}</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card>
                    <div class="mt-4">
                        <v-icon color="indigo" class="mr-2">mdi-book-heart</v-icon>
                        <span class="text-h6 text-md-h6">Os 5 livros mais alugados</span>
                        <v-btn color="#6994c7" text class="ml-5" to="/Book">Ver todos</v-btn>
                    </div>
                    <v-card class="rounded-lg">
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">Livro</th>
                                        <th class="text-left">Autor</th>
                                        <th class="text-left">Editora</th>
                                        <th class="text-left">Total de vezes alugado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="book in books" :key="book.id">
                                        <td>{{ book.name }}</td>
                                        <td>{{ book.author }}</td>
                                        <td>{{ book.publisherName }}</td>
                                        <td>
                                            <strong>{{ book.totalTimesRented }}</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card>
                </v-col>
            </v-col>
            <v-col>
                <template>
                    <Doughnut
                        :chart-options="chartOptions"
                        :chart-data="chartData"
                        :chart-id="chartId"
                        :dataset-id-key="datasetIdKey"
                        :plugins="plugins"
                        :css-classes="cssClasses"
                        :styles="styles"
                        :width="width"
                        :height="height"
                        class="doughnutChart"
                    />
                </template>
                <!-- <v-card rounded-xl class="mt-10 pa-4" elevation="1">
                    <v-col>
                        <v-row class="rent-target-row">
                            <span class="rent-target-title"> META DE ALUGUÉIS</span>
                            <v-icon v-if="!editingRentTarget" class="rent-target-icon" @click="startEditingRentTarget"
                                >mdi-pencil-outline</v-icon
                            >
                            <v-icon v-else class="rent-target-icon" @click="saveRentTarget"> mdi-check </v-icon>
                        </v-row>
                        <v-row class="rent-target-row">
                            <template v-if="!editingRentTarget">
                                <strong>
                                    <span class="first-value">{{ totalRentals }}</span>
                                </strong>
                                <span class="mt-2 second-value">/{{ newRentTarget }}</span>
                            </template>
                            <template v-else>
                                <v-text-field
                                    v-model="newRentTarget"
                                    label="Nova Meta"
                                    type="number"
                                    @input="calculateTargetRentPercent"
                                ></v-text-field>
                            </template>
                        </v-row>
                    </v-col>
                    <v-progress-linear v-model="targetRentPercent" color="blue-grey" height="25">
                        <template v-slot:default="{ value }">
                            <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                    </v-progress-linear>
                </v-card> -->
                <template>
                    <LineChart style="display: none" />
                </template>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import BookApi from '@/services/BookService';
import RentalApi from '@/services/RentalService';
import UserApi from '@/services/UserService';
import PublisherApi from '@/services/PublisherService';
import { Doughnut } from 'vue-chartjs/legacy';
import LineChart from '@/components/LineChart.vue';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
    name: 'DoughnutChart',
    components: {
        Doughnut,
        LineChart
    },
    props: {
        chartId: {
            type: String,
            default: 'doughnut-chart'
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

        latestRentals: [],
        bestCustomers: [],
        totalAtraso: 0,
        totalBooks: 0,
        totalRentals: 0,
        totalPublishers: 0,
        totalUsers: 0,
        intervalId: null,
        editingRentTarget: false,
        newRentTarget: parseFloat(localStorage.getItem('rentTarget')) || 100,
        calculatedTargetRentPercent: 0,
        // rentalsPerDay: this.calculateRentalsPerDay(),
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
            labels: [
                'Em atraso',
                'No prazo',
                'Devolvido & Atrasado',
                'Devolvido & no prazo',
                'Pendente & atrasado',
                'Pendente & no prazo'
            ],
            datasets: [
                {
                    backgroundColor: ['#3787ba', '#3735bc', '#7a1eb5', '#be439e', '#be437e', '#37a2ba'],
                    data: [0, 0, 0, 0, 0, 0, 0]
                }
            ]
        },
        chartOptions: {
            responsive: true,
            maintainAspectRatio: false
        }
    }),
    computed: {
        targetRentPercent() {
            return this.calculatedTargetRentPercent;
        }
    },
    mounted() {
        this.loadLatestRentals();
        this.loadBestCustomers();
        this.loadMostRentedBooks();
        this.calculateTotalBooks();
        this.calculateTotalRentals();
        this.calculateTotalUsers();
        this.calculateTotalPublishers();
        this.startInterval();
        this.listRentals();
    },

    beforeDestroy() {
        this.stopInterval();
    },

    methods: {
        loadMostRentedBooks() {
            BookApi.listAll()
                .then((response) => {
                    const filteredBooks = response.data.filter((book) => book.totalTimesRented > 0);
                    const sortedBooks = filteredBooks.sort((a, b) => b.totalTimesRented - a.totalTimesRented);

                    this.books = sortedBooks.slice(0, 6);
                })
                .catch((error) => {
                    console.error('Error fetching books:', error);
                });
        },

        loadLatestRentals() {
            RentalApi.listAll()
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
            RentalApi.listAll()
                .then((response) => {
                    this.rentalsForStatus = response.data;
                })
                .catch((error) => {
                    console.error('Error fetching rentals:', error);
                });
        },
        calculateTotalRentals() {
            RentalApi.listAll()
                .then((response) => {
                    this.totalRentals = response.data.length;
                })
                .catch((error) => {
                    console.error('Error fetching rentals:', error);
                });
        },
        calculateTotalBooks() {
            BookApi.listAll()
                .then((response) => {
                    this.totalBooks = response.data.length;
                })
                .catch((error) => {
                    console.error('Error fetching books:', error);
                });
        },
        calculateTotalUsers() {
            UserApi.listAll()
                .then((response) => {
                    this.totalUsers = response.data.length;
                })
                .catch((error) => {
                    console.error('Error fetching users:', error);
                });
        },
        calculateTotalPublishers() {
            PublisherApi.listAll()
                .then((response) => {
                    this.totalPublishers = response.data.length;
                })
                .catch((error) => {
                    console.error('Error fetching publishers:', error);
                });
        },

        listRentals() {
            RentalApi.listAll()
                .then((response) => {
                    this.rentals = response.data;
                })
                .catch((error) => {
                    console.error('Error fetching rentals:', error);
                });
        },

        async loadBestCustomers() {
            try {
                const response = await UserApi.listAll();
                const users = response.data;

                const userPromises = users.map(async (user) => {
                    const userDetails = await UserApi.findById(user.id);
                    return userDetails.data;
                });

                const userWithDetails = await Promise.all(userPromises);

                userWithDetails.sort((a, b) => b.numberOfRentals - a.numberOfRentals);

                this.bestCustomers = userWithDetails.slice(0, 6);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        startInterval() {
            this.intervalId = setInterval(this.calculateTargetRentPercent, 1000); // Recalcula a cada 1000 ms (1 segundo)
        },

        stopInterval() {
            clearInterval(this.intervalId);
        },

        calculateTargetRentPercent() {
            const rentTarget = parseFloat(this.newRentTarget);
            this.calculatedTargetRentPercent = (this.totalRentals / rentTarget) * 100;
            localStorage.setItem('rentTarget', this.newRentTarget);
        },

        startEditingRentTarget() {
            this.editingRentTarget = true;
        },

        saveRentTarget() {
            localStorage.setItem('rentTarget', this.newRentTarget); // Armazena o novo valor no localStorage
            this.editingRentTarget = false;
            this.calculateTargetRentPercent();
        },

        countRentalStatus() {
            const counts = {
                allLate: 0,
                allInTime: 0,
                pendingOnTime: 0,
                pendingLate: 0,
                returnedOnTime: 0,
                returnedLate: 0
            };

            for (const rental of this.rentals) {
                if (rental.status === 'RETURNED_LATE' || rental.status === 'PENDING_LATE') {
                    counts.allLate++;
                } else if (rental.status === 'RETURNED_ON_TIME' || rental.status === 'PENDING_ON_TIME') {
                    counts.allInTime++;
                }

                if (rental.status === 'PENDING_ON_TIME') {
                    counts.pendingOnTime++;
                }

                if (rental.status === 'PENDING_LATE') {
                    counts.pendingLate++;
                }

                if (rental.status === 'RETURNED_ON_TIME') {
                    counts.returnedOnTime++;
                }

                if (rental.status === 'RETURNED_LATE') {
                    counts.returnedLate++;
                }
            }

            return counts;
        },

        updateChartData() {
            const counts = this.countRentalStatus();
            this.chartData.datasets[0].data = [
                counts.allLate,
                counts.allInTime,
                counts.returnedLate,
                counts.returnedOnTime,
                counts.pendingLate,
                counts.pendingOnTime
            ];
        }

        // calculateRentalsPerDay() {
        //     const rentalsPerDay = ['2023-10-23', '2023-10-24'];

        //     for (const rental of this.rentals) {
        //         const rentalDate = new Date(rental.data_aluguel);
        //         const dayOfWeek = rentalDate.getDay();

        //         const mappedDayOfWeek = ((dayOfWeek + 6) % 7) + 1;

        //         rentalsPerDay[mappedDayOfWeek - 1]++;
        //         console.log(rentalDate);
        //     }

        //     return;
        // }
    },

    watch: {
        rentals: {
            handler() {
                this.updateChartData();
            },
            deep: true
        }
    }
};
</script>

<style>
@import '../assets/styles/DashboardView.css';
</style>
