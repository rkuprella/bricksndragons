<template>
  <transition
    enter-active-class="transition ease-out transform"
    enter-class="-translate-y-3 opacity-75"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition ease-in transform"
    leave-class="opacity-100"
    leave-to-class="translate-y-6 opacity-0"
  >
    <div
      v-if="showLogin"
      class="absolute z-40 grid text-gray-200 pointer-events-none inset-x-6 sm:inset-x-0 top-24 sm:top-64 place-items-center"
    >
      <div
        class="relative grid grid-cols-1 mx-auto overflow-hidden bg-gray-800 rounded shadow-xl pointer-events-auto sm:grid-cols-2"
      >
        <button
          role="button"
          type="button"
          aria-label="Close login"
          @click="setUserLogin(false)"
          class="absolute p-2 transition transform top-1 right-1 hover:scale-110 active:scale-90 hover:rotate-12"
        >
          <svg
            class="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          class="flex flex-col items-center w-full gap-3 px-4 py-4 sm:w-64 lg:w-96 bg-gray-700/10"
        >
          <div class="flex flex-col items-center justify-center flex-1 gap-3">
            <nuxt-picture
              fill="cover"
              width="840"
              height="453"
              quality="70"
              src="/images/logo-bricksanddragons.png"
              alt="Bricks and Dragons Logo"
              sizes="xs:288px"
              class="w-48"
            />
            <p class="mt-3 text-xl text-center">
              Become a <strong>Brick Dungeon Master</strong>!
            </p>
          </div>
          <button class="w-full px-4 py-2 text-white bg-purple-500 rounded">
            Not registered? Signup!
          </button>
        </div>
        <div class="flex flex-col w-full px-4 py-4 sm:w-64 lg:w-96">
          <div class="flex flex-col flex-1 gap-3">
            <h2>Login</h2>

            <ul>
              <li><button>Login with Facebook</button></li>
              <li><button>Login with Google</button></li>
              <li><button>Login with GitHub</button></li>
            </ul>
            <form @submit.prevent>
              <div>
                <label for="email">Email</label>
                <input id="email" type="text" v-model="auth.email" />
              </div>
              <div>
                <label for="password">Password</label>
                <input id="password" type="password" v-model="auth.password" />
              </div>
              <div>
                <input type="checkbox" id="stayLoggedIn" />
                <label for="stayLoggedIn">Stay logged in</label>
              </div>
            </form>
            <p v-show="error">{{ error }}</p>
          </div>
          <button @click.once="forgotPassword">Forgot password</button>
          <button
            class="w-full px-4 py-2 text-white bg-green-500 rounded"
            @click="login"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      auth: {
        email: "",
        password: ""
      },
      error: ""
    };
  },
  computed: {
    ...mapState(["user", "showLogin"])
  },
  methods: {
    ...mapActions(["setUserLogin"]),
    login() {
      this.$fire.auth
        .signInWithEmailAndPassword(this.auth.email, this.auth.password)
        .catch(err => {
          this.error = err.message;
        })
        .then(user => {
          this.$router.push("/");
        });
    },
    forgotPassword() {
      this.$fire.auth
        .sendPasswordResetEmail(this.auth.email)
        .then(() => {
          this.error = `Reset mail sent to ${this.auth.email}`;
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>
