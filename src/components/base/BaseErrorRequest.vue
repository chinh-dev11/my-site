<template>
  <div :class="$style['error-request-container']">
    <p :class="$style['text']">
      Oops! {{ $t('errors.server-request.text-1') }}.
      <span>[{{ errorCode }}]</span>
    </p>
    <p :class="$style['text']">
      {{ $t('errors.server-request.text-2') }}.
    </p>
  </div>
</template>

<script>
    export default {
        props: {
            errorCode: {
                type: String,
                default: () => ''
            }
        }
    };
</script>

<style lang="scss" module>
.error-request-container {
    padding: 2em;
}
.text {
    color: $error-request-txt-color;
    margin-bottom: 1em;
    > span {
      color: $dimlight-color-dark;
    }
    &:last-child {
      margin-bottom: 0;
    }
}
</style>