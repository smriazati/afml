<template>
  <div class="comp-stripe-wrapper">
    <div ref="card"></div>
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
      <!-- <div class="donation-custom-amount flex-row">
        <input
          class="btn-light btn-padding"
          ref="aCustom"
          v-model="customAmount"
          placeholder="Enter Custom Amount"
        />
      </div> -->
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
          ref="donateButn"
          type="button"
          :class="isFormValid ? '' : 'disabled'"
          @click="checkDonationSubmission()"
        >
          <span>Donate</span>
        </button>
      </div>
      <div v-if="error" ref="errorMsg" class="flex-row error">
        {{ error }}
      </div>
    </form>
    <div v-else>
      <div class="flex-col text-wrapper">
        <h2 class="h3">Thank you for your donation!</h2>
        <p>
          In case your browser did not open the checkout page in a new tab,
          <a :href="rewardLink" target="_blank"
            >click here to complete your donation.</a
          >
        </p>
      </div>
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
      rewardLink: null,
      donationsWithoutReward: [
        {
          type: "One Time",
          amount: 10,
          url: "https://buy.stripe.com/9AQ7tO7D0fINczm4gg",
        },
        {
          type: "One Time",
          amount: 25,
          url: "https://buy.stripe.com/28og0ke1odAF7f29AB",
        },
        {
          type: "One Time",
          amount: 50,
          url: "https://buy.stripe.com/7sI6pKg9wcwB42QdQS",
        },
        {
          type: "One Time",
          amount: 100,
          url: "https://buy.stripe.com/cN2aG06yWdAFaredQT",
        },
        {
          type: "Monthly",
          amount: 10,
          url: "https://buy.stripe.com/4gwdScbTg68dgPCbIP",
        },
        {
          type: "Monthly",
          amount: 25,
          url: "https://buy.stripe.com/5kAeWg1eCdAF56U4gm",
        },
        {
          type: "Monthly",
          amount: 50,
          url: "https://buy.stripe.com/14k8xSaPcfINczmfZ3",
        },
        {
          type: "Monthly",
          amount: 100,
          url: "https://buy.stripe.com/4gw9BW2iGgMR8j6cMQ",
        },
      ],
      donationsWithReward: [
        {
          type: "One Time",
          amount: 10,
          url: "https://buy.stripe.com/cN2cO87D08gl6aYeV4",
        },
        {
          type: "One Time",
          amount: 25,
          url: "https://buy.stripe.com/cN25lG4qOdAF42Q4gr",
        },
        {
          type: "One Time",
          amount: 50,
          url: "https://buy.stripe.com/9AQ5lGg9w68dfLy7sB",
        },
        {
          type: "One Time",
          amount: 100,
          url: "https://buy.stripe.com/cN229u0ayfIN7f25ks",
        },
        {
          type: "Monthly",
          amount: 10,
          url: "https://buy.stripe.com/cN24hCe1obsx8j6bIW",
        },
        {
          type: "Monthly",
          amount: 25,
          url: "https://buy.stripe.com/00gcO8e1o9kp1UIcN1",
        },
        {
          type: "Monthly",
          amount: 50,
          url: "https://buy.stripe.com/cN215q4qO68d1UI28l",
        },
        {
          type: "Monthly",
          amount: 100,
          url: "https://buy.stripe.com/cN25lG4qOdAF42Q4gr",
        },
      ],
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
      // if (this.customAmount) {
      //   // check custom amount
      //   if (isNaN(this.customAmount)) {
      //     this.error =
      //       "Please enter a number without decimals in the custom amount field";
      //     return;
      //   }
      //   // otherwise
      //   this.submitDonation(
      //     this.donationType,
      //     this.customAmount,
      //     this.donationWithReward
      //   );
      // } else {
      // if not a custom amoutn, then just submit it
      this.submitDonation(
        this.donationType,
        this.donationAmount,
        this.donationWithReward
      );
      // }
    },
    submitDonation(type, amount, reward) {
      // stripe stuff goes here
      // console.log(type, amount, reward);
      let link;
      if (reward) {
        link = this.donationsWithReward.filter(
          (item) => item.type === type && item.amount == amount
        )[0];
      } else {
        link = this.donationsWithoutReward.filter(
          (item) => item.type === type && item.amount == amount
        )[0];
      }
      // console.log(link.url);
      if (!link.url) {
        return;
      }
      this.donationSuccess = true;
      this.rewardLink = link.url;
      window.open(link.url, "_blank");
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