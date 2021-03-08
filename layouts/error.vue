<template>
  <v-app id="error">
    <h1 v-if="error.statusCode === 404" class="mt-14">
      <v-card
        outlined
        color="#F5F5F5"
        height="200"
        rounded="30"
        class="px-4 py-8 text-center"
      >
        <div class="mb-3">お探しのページが見つかりません。</div>
        <div class="text-subtitle-1 mb-3">URLが正しいか確認してください。</div>
        <NuxtLink to="/" class="text-subtitle-1"> ホーム画面へ戻る</NuxtLink>
      </v-card>
      <v-img contain max-height="500" src="/cat.webp" />
      <div class="text-caption text-center">
        illustrated by
        <a href="https://shigureni.com/" target="_blank" class="ml-1">
          shigureni
        </a>
      </div>
    </h1>

    <h1 v-else class="mt-14">
      <v-card
        outlined
        color="#F5F5F5"
        height="200"
        rounded="30"
        class="px-4 py-8 text-center"
      >
        <div class="mb-3">エラーが発生しました。</div>
        <div class="text-subtitle-1 mb-3">ページをリロードしてください。</div>
        <NuxtLink to="/" class="text-h6"> ホーム画面へ戻る</NuxtLink>
      </v-card>
      <v-img contain max-height="500" src="/cat.webp" />
      <div class="text-caption text-center">
        illustrated by
        <a href="https://shigureni.com/" target="_blank" class="ml-1">
          shigureni
        </a>
      </div>
    </h1>
  </v-app>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
