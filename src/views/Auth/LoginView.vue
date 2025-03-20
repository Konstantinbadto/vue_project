<template>
	<v-container>
	  <v-row justify="center">
		<v-col cols="12" sm="8" lg="6">
		  <v-card class="elevetion-12">
			<v-toolbar dark color="primary">
			  <v-toolbar-title>Login</v-toolbar-title>
			</v-toolbar>
			<v-card-text>
			  <v-form v-model="valid" ref="form" validation>
				<v-text-field
				  prepend-icon="mdi-account"
				  name="email"
				  label="Email"
				  type="email"
				  v-model="email"
				  :rules="emailRules"
				>
				</v-text-field>
				<v-text-field
				  prepend-icon="mdi-lock"
				  name="password"
				  label="Password"
				  type="password"
				  v-model="password"
				  :rules="passwordRules"
				>
				</v-text-field>
			  </v-form>
			</v-card-text>
			<v-card-actions>
			  <v-spacer></v-spacer>
			  <v-btn
				color="primary"
				@click="onSubmit"
				:disabled="!valid || isLoading"
			  >
				<v-icon left v-if="isLoading">mdi-loading mdi-spin</v-icon>
				Login
			  </v-btn>
			</v-card-actions>
		  </v-card>
		  <v-alert
			  v-if="errorMessage"
			  type="error"
			  dense
			  dismissible
			>
			  {{ errorMessage }}
			</v-alert>
		</v-col>
	  </v-row>
	</v-container>
  </template>

  <script>
  import { mapActions, mapState } from 'vuex'; // Импортируем mapActions и mapState

  export default {
	data() {
	  return {
		email: '',
		password: '',
		valid: false,
		emailRules: [
		  v => !!v || 'E-mail is required',
		  v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
		],
		passwordRules: [
		  v => !!v || 'Password is required',
		  v => (v && v.length >= 6) || 'Password must be more or equel than 6 characters'
		]
	  };
	},
	computed: {
	  ...mapState(['error', 'loading']), // Получаем error и loading из Vuex
	  errorMessage() {
		return this.error; // Или this.$store.getters.error, если mapState не используется
	  },
	  isLoading() {
		return this.loading; // Или this.$store.state.loading
	  },
	},
	methods: {
	  ...mapActions(['loginUser']), //  Импортируем loginUser
	  onSubmit() {
		if (this.$refs.form.validate()) {
		  const user = {
			email: this.email,
			password: this.password
		  };
		  this.loginUser(user)
			.then(() => {
			  this.$router.push("/");
			})
		}
	  }
	}
  };
  </script>
