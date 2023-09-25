<template>
  <div class="checkout-cnt">
    <div class="checkoutTitle-cnt">
      <h1>Shopping Cart</h1>
    </div>
    <div class="checkoutBody-cnt">
      <div class="checkoutItemDetails">
        <img
          style="height: 150px"
          src="http://res.cloudinary.com/furnitureappimages/image/upload/v1694231114/vu4bppisy7api74dybm0.png"
        />
        <div class="checkout-itemInfo">
          <span class="checkout-itemTitle">Chair</span>
          <span class="checkout-itemDescription"
            >This Description is for the chair. I think you should order
            this.</span
          >
        </div>
        <span class="checkout-itemPrice">500 dram</span>
      </div>
      <div class="checkoutInfo">
        <div class="summary-cnt"><h2>Summary</h2></div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style>
.checkout-cnt {
  display: flex;
  flex-direction: column;
  margin: 5px auto;
  width: 90%;
}

.checkoutBody-cnt {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.checkoutItemDetails {
  display: flex;
  padding: 20px;
  justify-content: start;
  gap: 50px;
  align-items: center;
  border: 1px solid black;
  height: 100%;
  flex: 1;
}
.checkoutInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 350px;
  height: 150px;
}
.summary-cnt {
  border: 1px solid black;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 1px solid black;
}
.checkout-itemInfo {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.checkout-itemTitle {
  font-size: 1.5rem;
  font-weight: 700;
}
.checkout-itemDescription {
  text-align: center;
  font-size: 1rem;
  font-weight: 300;
  max-width: 250px;
}
</style>
