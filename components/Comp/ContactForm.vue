/<template>
  <div class="contact-form">
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      :action="successRoute"
      enctype="application/x-www-form-urlencoded"
      :class="hasError ? 'has-error' : 'no-error'"
    >
      <input type="hidden" name="form-name" value="contact" />

      <div v-if="name" class="form-group">
        <label for="name" class="visually-hidden">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          v-model="nameInput"
          :class="isNameValid ? 'is-valid' : 'is-not-valid'"
        />
      </div>

      <div v-if="email" class="form-group">
        <label for="email" class="visually-hidden">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          :class="isEmailValid ? 'is-valid' : 'is-not-valid'"
          v-model="emailInput"
        />
      </div>

      <div v-if="fileUpload" class="form-group">
        <label
          >Attach files: <input class="button" type="file" name="files"
        /></label>
        <p class="small">Limit 1 file</p>
      </div>

      <div v-if="message" class="form-group">
        <label for="message" class="visually-hidden">Message</label>
        <textarea
          name="message"
          id="message"
          placeholder="Message"
          v-model="messageInput"
          :class="isMessageValid ? 'is-valid' : 'is-not-valid'"
        />
      </div>

      <div class="form-group" @click="onSubmitClick">
        <button :disabled="!isFormValid" class="button" type="submit">
          <span>Submit</span>
        </button>
      </div>
      <div v-if="hasError" class="form-group error-group">
        <div v-if="!isNameValid">
          <p>Please include your name.</p>
        </div>
        <div v-if="!isEmailValid">
          <p>Please include a valid email containing @.</p>
        </div>
        <div v-if="!isMessageValid">
          <p>Please include a message.</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    email: {
      type: Boolean,
    },
    name: {
      type: Boolean,
    },
    message: {
      type: Boolean,
    },
    fileUpload: {
      type: Boolean,
    },
    successRoute: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      emailInput: null,
      nameInput: null,
      messageInput: null,
      hasError: false,
    };
  },
  computed: {
    isNameValid() {
      if (!this.name || !this.nameInput) {
        return false;
      }
      if (this.nameInput.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    isEmailValid() {
      if (!this.email || !this.emailInput) {
        return false;
      }
      if (this.validateEmail(this.emailInput)) {
        return true;
      } else {
        return false;
      }
    },
    isMessageValid() {
      if (!this.message || !this.messageInput) {
        return false;
      }
      if (this.messageInput.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    areFieldsValid() {
      return {
        name: this.isNameValid,
        email: this.isEmailValid,
        message: this.isMessageValid,
      };
    },
    isFormValid() {
      if (!this.areFieldsValid) {
        return null;
      }
      const values = Object.values(this.areFieldsValid);
      if (values.includes(false)) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    onSubmitClick() {
      //   console.log("hi");
      if (!this.isFormValid) {
        this.hasError = true;
      }
    },
    validateEmail(input) {
      const validation = input.includes("@");
      if (validation) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
.contact-form form {
  @media (max-width: $collapse-bp) {
    input,
    textarea {
      &::placeholder {
        text-align: left;
      }
    }
  }
}
</style>