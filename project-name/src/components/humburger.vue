<template>
  <a class="hamburger hamburger-vertical">
    <span class="hamburger__ico"></span>
  </a>
</template>
<script>
export default {
  name: 'Humburger'
};
</script>
<style lang="scss">
@import '~@/assets/sass/_env/import';

//  //w3bits.com/animated-hamburger-icons/

.hamburger {
  @include size($line-height);
  display: inline-block;
  padding: 0;
  cursor: pointer;
  transition: transform .2s ease-in-out;
  vertical-align: middle;
  border: 0 none;
  background: transparent;

  &__ico {
    @include size($line-height);

    display: inline-block;
    vertical-align: middle;
    fill: currentColor;
  }
}

  /**
  * Button height fix for Firefox
  */
.hamburger::-moz-focus-inner {
  padding: 0;
  border: 0 none;
}
/**
* Focus fix for Chrome
*/
.hamburger:focus {
  outline: 0;
}

/**
* Styling the icon
*/
.hamburger:before,
.hamburger:after {
  content: "";
}

.hamburger:before,
.hamburger .hamburger__ico,
.hamburger:after {
  display: block;
  width: 100%;
  height: 20%;
  margin: 0 0 20%;
  border-radius: 3px;
  transition: transform .2s ease-in-out;
  background: #444;
}

/**
* Styles for the active `.hamburger` icon
*/
.hamburger.is-active:before,
.hamburger.is-active .hamburger__ico,
.hamburger.is-active:after {
  background: #444;
}

/**
* VERTICAL HAMBURGER
*/
.hamburger.hamburger-vertical.is-active {
  transform: rotate(270deg);
}
</style>
