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
               
                    <v-toolbar-title>Editoras</v-toolbar-title>
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
                                                    v-model="PublisherItem.nome"
                                                    label="Nome"
                                                    append-icon="mdi-home-city"
                                                ></v-text-field>
                                            </v-row>

                                            <v-row class="mr-2" cols="12" sm="6" md="4">
                                                <v-text-field
                                                    color="indigo lighten-1"
                                                    required
                                                    :rules="rules"
                                                    v-model="PublisherItem.cidade"
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
import PublisherApi from '@/services/PublisherService';
import { showAlertToast, showAlertRemove, showAlertError } from '@/components/sweetalert';

export default {
    data: () => ({
      
        publisher: [],
        search: '',
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'ID', align: 'start', sortable: true, value: 'id' },
            { text: 'Nome', value: 'nome', align: 'start' },
            { text: 'Cidade', value: 'cidade', align: 'start' },
            { text: 'Ações', value: 'actions', sortable: false, align: 'center' }
        ],
       
        PublisherItem: {
            id: null,
            nome: '',
            cidade: ''
        },
      
        rules: [(value) => !!value || 'Este campo é obrigatório.'],
      
        errors: []
    }),

    mounted() {
        this.list();
    },

    methods: {
        list() {
          
            PublisherApi.list().then((resposta) => {
                this.publisher = resposta.data;
            });
        },

       
        save() {
            if (this.$refs.form.validate()) {
                PublisherApi.save(this.PublisherItem)
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
                            showAlertError('Ops', error.response.data.error);
                        }
                    });
            }
        },

        editItem(item) {
            if (item.id) {
                this.PublisherItem = Object.assign({}, item);
                this.dialog = true;
            }
        },

       
        close() {
            this.dialog = false;

            this.PublisherItem = {
                id: null,
                nome: '',
                cidade: ''
            };

            this.$refs.form.resetValidation();
        },


        deleteItemConfirm(item) {
            PublisherApi.delete(item)
                .then(() => {
                    showAlertToast('success', 'Registro deletado com sucesso.');
                    this.list();
                })
                .catch(() => {
                    showAlertError('Não foi possível apagar.', 'A editora possui associação com algum livro.');
                });
        },

        onClickSave() {
            if (this.PublisherItem.id) {
                return this.edit(this.PublisherItem);
            }
            this.save(this.PublisherItem);
        },

        OnClickDelete(item) {
            showAlertRemove(() => this.deleteItemConfirm(item));
        },

        edit() {
            if (this.$refs.form.validate()) {
                PublisherApi.update(this.PublisherItem)
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
                            showAlertError('Ops', error.response.data.error);
                        }
                    });
            }
        }
    },

    computed: {
      
        formTitle() {
            return !this.PublisherItem.id ? 'Nova Editora' : 'Editar Editora';
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
