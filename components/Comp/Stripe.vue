<template>
  <div class="comp-stripe-wrapper">
    <form v-if="!donationSuccess">
      <div class="donation-type flex-row flex-row-mobile">
        <button
          v-for="(item, index) in donationTypes"
          :key="index"
          type="button"
          class="btn-light"
          :class="activeDonationType === index ? 'active' : ''"
          @click="setDonationType(item, index)"
        >
          <span>{{ item }}</span>
        </button>
      </div>
      <div class="donation-amount flex-row flex-row-mobile">
        <button
          v-for="(item, index) in amounts"
          :key="index"
          type="button"
          class="btn-light"
          :class="activeDonationAmount === index ? 'active' : ''"
          @click="setDonationAmount(item, index)"
        >
          <span>${{ item }}</span>
        </button>
      </div>
      <div class="donation-custom-amount flex-row">
        <input
          class="btn-light"
          ref="aCustom"
          v-model="customAmount"
          placeholder="Enter Custom Amount"
        />
      </div>
      <div class="opt-in flex-row">
        <div
          class="custom-checkbox-input link-hover"
          :class="donationWithReward ? 'checked' : ''"
          @click="toggleDonationReward()"
        >
          <input
            type="checkbox"
            id="getReward"
            name="getReward"
            value="true"
            class="get-reward"
          />
          <label for="getReward"
            >I&rsquo;d like to receive a #FairBall Wristband for every $10
            donated!</label
          ><br />
        </div>
      </div>
      <div class="submit flex-row">
        <button
          class="submit btn-orange"
          ref="donateButton"
          type="button"
          :class="isFormValid ? '' : 'disabled'"
          @click="checkDonationSubmission()"
        >
          <span>Donate</span>
        </button>
      </div>
      <div v-if="error" class="flex-row error">
        {{ error }}
      </div>
    </form>
    <div v-else class="donation-success">
      <p v-if="donationAmount">
        Your {{ donationType }} donation of ${{ donationAmount }} is processing.
      </p>
      <p v-if="customAmount">
        Your {{ donationType }} donation of ${{ customAmount }} is processing.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amounts: [10, 25, 50, 100],
      isTypeSelected: false,
      donationAmount: null,
      donationType: null,
      activeDonationAmount: null,
      activeDonationType: null,
      donationWithReward: false,
      customAmount: null,
      donationTypes: ["Monthly", "One Time"],
      error: null,
      donationSuccess: false,
    };
  },
  watch: {
    customAmount() {
      if (this.customAmount) {
        // remove any other previus donation amount
        if (this.donationAmount > 0) {
          this.donationAmount = null;
          this.activeDonationAmount = null;
        }
      }
    },
  },
  methods: {
    setDonationAmount(amount, index) {
      this.donationAmount = amount;
      this.activeDonationAmount = index;
    },
    setDonationType(type, index) {
      this.donationType = type;
      this.activeDonationType = index;
    },
    toggleDonationReward() {
      this.donationWithReward = !this.donationWithReward;
    },
    checkDonationSubmission() {
      if (this.customAmount) {
        // check custom amount
        if (isNaN(this.customAmount)) {
          this.error =
            "Please enter a number without decimals in the custom amount field";
          return;
        }
        // otherwise
        this.submitDonation(
          this.donationType,
          this.customAmount,
          this.donationWithReward
        );
      } else {
        // if not a custom amoutn, then just submit it
        this.submitDonation(
          this.donationType,
          this.donationAmount,
          this.donationWithReward
        );
      }
    },
    submitDonation(type, amount, reward) {
      // stripe stuff goes here
      this.donationSuccess = true;
      console.log(type, amount, reward);
    },
  },
  computed: {
    isFormValid() {
      if (this.donationType && (this.customAmount || this.donationAmount)) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
.comp-stripe-wrapper {
  form {
    button,
    input {
      flex: 1;
    }
    > .flex-row {
      > *:not(last-child) {
        margin-right: 5px;
      }
      > *:not(last-child) {
        margin-bottom: 5px;
      }
    }
    .opt-in {
      margin-top: 18px;
    }
    button.submit {
      margin-top: 22px;
    }
    .donation-custom-amount input {
      padding-left: 15px;
      padding-right: 15px;
    }
    input[type="checkbox"] {
      display: none;
    }
  }
}
</style>