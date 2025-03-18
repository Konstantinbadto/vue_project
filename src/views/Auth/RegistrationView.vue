<template>
	<v-container>
	  <v-row justify="center">
		<v-col cols="12" sm="8" lg="6">
		  <v-card class="elevation-12">
			<v-toolbar dark color="primary">
			  <v-toolbar-title>Registration</v-toolbar-title>
			</v-toolbar>
			<v-card-text>
			  <v-form v-model="valid" ref="form" @submit.prevent="onSubmit">
				<v-text-field
				  prepend-icon="mdi-account"
				  name="email"
				  label="Email"
				  type="email"
				  v-model="email"
				  :rules="emailRules"
				></v-text-field>
				<v-text-field
				  prepend-icon="mdi-lock"
				  name="password"
				  label="Password"
				  type="password"
				  v-model="password"
				  :rules="passwordRules"
				></v-text-field>
				<v-text-field
				  prepend-icon="mdi-lock"
				  name="confirm-password"
				  label="Confirm Password"
				  type="password"
				  v-model="confirmPassword"
				  :rules="confirmPasswordRules"
				></v-text-field>
				<v-alert v-if="errorMessage" type="error" dismissible>
				  {{ errorMessage }}
				</v-alert>
			  </v-form>
			</v-card-text>
			<v-card-actions>
			  <v-spacer></v-spacer>
			  <v-btn
				color="primary"
				type="submit"
				:disabled="!valid || loading"
				:loading="loading"
			  >
				Create Account
			  </v-btn>
			</v-card-actions>
		  </v-card>
		</v-col>
	  </v-row>
	</v-container>
  </template>

  <script>
  import { mapActions } from 'vuex';

  export default {
	data() {
	  return {
		email: '',
		password: '',
		confirmPassword: '',
		valid: false,
		loading: false,
		errorMessage: null,
		emailRules: [
		  v => !!v || 'E-mail is required',
		  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
		],
		passwordRules: [
		  v => !!v || 'Password is required',
		  v => (v && v.length >= 6) || 'Password must be more or equal than 6 characters',
		],
		confirmPasswordRules: [
		  v => !!v || 'Password is required',
		  v => v === this.getPassword || 'Password should match'
		],
	  };
	},
	  computed: {
		getPassword(){
		return this.password
		}
	  },
	methods: {
	  ...mapActions(['registerUser']),

	  onSubmit() {
		if (this.$refs.form.validate()) {
		  this.loading = true; // Включаем индикатор загрузки
		  this.errorMessage = null;

		  const user = {
			email: this.email,
			password: this.password,
		  };

		  this.registerUser(user)
			.then(() => {
			  console.log('Регистрация прошла успешно!');
			  this.$router.push('/profile');
			  this.email = '';
			  this.password = '';
			  this.confirmPassword = '';
			  this.$refs.form.reset();
			})
			.catch(error => {
			  console.error('Ошибка регистрации:', error);
			  this.errorMessage = error.message || 'Произошла ошибка при регистрации.';
			})
			.finally(() => {
			  this.loading = false; // Выключаем индикатор загрузки
			});
		}
	  },
	},
  };
  </script>
