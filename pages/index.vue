<template>
  <v-container id="index" class="pa-0">
    <v-row no-gutters justify="center" class="mt-15">
      <v-col cols="12" class="px-2">
        <!-- 最初に表示するボタン -->
        <div class="mt-2 pa-2 card">
          <div class="faceicon">
            <img src="/woman.webp" alt="事務の女性" />
          </div>
          <div class="content">
            <div>
              <div class="ml-2 mb-2 text-subtitle-1">
                知りたいことは何ですか？<br />ボタンを１つ押してください👇
              </div>
              <v-btn
                v-for="btn in CATEGORIES"
                :key="btn.value"
                class="mx-1 my-1"
                :color="btn.color"
                dense
                @click="showSubcategories(btn.value, btn.text)"
              >
                <div class="white--text">
                  {{ btn.text }}
                </div>
              </v-btn>
            </div>
          </div>
        </div>
        <!-- ユーザのコメント -->
        <v-row no-gutters>
          <v-col
            v-if="userAnswers[0]"
            cols="12"
            class="user-comment text-right"
          >
            <p>
              {{ userAnswers[0] }}
            </p>
          </v-col>
        </v-row>
        <!-- カテゴリ選択肢一覧 -->
        <div v-if="isSubcategorySelected" class="pa-2 my-2 card">
          <div class="faceicon">
            <img src="/woman.webp" alt="事務の女性" />
          </div>
          <div class="content">
            <div>
              <div class="px-2 pb-2 text-subtitle-1">
                {{ selectedCategory }} の何について知りたいですか？<br />
                ボタンを１つ押してください👇
              </div>
              <v-btn
                v-for="btn in selectedSubcategoryItems"
                :key="btn.value"
                class="mx-1 my-1"
                :color="btn.color"
                dense
                @click="showSubcategoryAnswers(btn.value, btn.text)"
              >
                <div class="white--text">
                  {{ btn.text }}
                </div>
              </v-btn>
            </div>
          </div>
        </div>
        <div v-if="userAnswers[1]" class="user-comment text-right">
          <p>
            {{ userAnswers[1] }}
          </p>
        </div>
        <!-- 選択されたサブカテゴリにある質問と解答の一覧を表示 -->
        <div v-if="isSubcategoryItemSelected" class="pa-2 my-2 card">
          <div class="faceicon">
            <img src="/woman.webp" alt="事務の女性" />
          </div>
          <div class="content">
            <div>
              <div class="pl-2 pb-2 text-subtitle-1">
                {{ selectedSubcategory }} に関係するQ＆Aです。<br />
                パネルをクリックして回答をご覧ください👍
              </div>
              <v-expansion-panels multiple hover>
                <v-expansion-panel
                  v-for="(panel, index) in selectedSubcategoryAnswers"
                  :key="index"
                  class="mx-1"
                  dense
                >
                  <v-expansion-panel-header>
                    Q. {{ panel.title }}
                    <template v-slot:actions>
                      <v-icon color="#79BD9A"> $expand </v-icon>
                    </template>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <span class="text-subtitle-1">A. </span>
                    <v-textarea
                      :value="panel.answer"
                      auto-grow
                      outlined
                      readonly
                      color="#79BD9A"
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <div class="ma-2">
                もし知りたい内容がこの中になければ、
                <a
                  target="_blank"
                  href="https://forms.office.com/Pages/ResponsePage.aspx?id=HvJYJ0E3c0SlzbTYCHVjuZWiBTfteqVHmRkgIVNAoOJUQTg3NUFKM0c2UjNXREFOMUpRR0ZDUU5RNyQlQCN0PWcu"
                >
                  こちらからお気軽に質問してください😊
                </a>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { answerData } from '@/answerData'

const CATEGORIES = [
  {
    value: 'office',
    text: 'Office(マイクロソフト オフィス)',
    color: '#79BD9A'
  },
  {
    value: 'microsoft',
    text: 'Microsoft',
    color: '#79BD9A'
  },
  { value: 'teams', text: 'Teams', color: '#79BD9A' },
  { value: 'zoom', text: 'Zoom', color: '#79BD9A' },
  { value: 'webClass', text: 'WebClass', color: '#79BD9A' },
  { value: 'step', text: 'Stepポータル', color: '#79BD9A' },
  { value: 'lan', text: '学内無線LAN', color: '#79BD9A' },
  { value: 'printer', text: 'プリンター', color: '#79BD9A' },
  { value: 'others', text: 'その他', color: 'grey' }
  // TODO:必要？
  // { value: 'os', text: 'OS', color: '#6088C6' },
  // { value: 'pc', text: 'パソコン操作方法', color: '#6088C6' },
  // { value: 'password', text: 'パスワード変更', color: '#6088C6' },
  // { value: 'facilities', text: '学内設備', color: '#6088C6' },
  // { value: 'email', text: '学内email', color: '#6088C6' },
  // {
  //   value: 'googleClassroom',
  //   text: 'Google classroom',
  //   color: '#6088C6'
  // },
  // { value: 'alc', text: 'ALC NetAcademy NEXT', color: '#6088C6' },
]
export default defineComponent({
  name: 'Index',
  setup(_, { root }) {
    const userAnswers = ref<Array<string>>([])
    const isSubcategorySelected = ref(false)
    const selectedCategory = ref('')
    const selectedSubcategoryItems = ref()
    // 選択されたカテゴリーのサブカテゴリー選択肢の一覧を表示する
    const showSubcategories = (
      categoryValue: string,
      categoryText: string
    ): void => {
      // Q＆A一覧を初期化する
      isSubcategoryItemSelected.value = false
      selectedSubcategoryAnswers.value = []
      selectedSubcategory.value = ''
      userAnswers.value[1] = ''
      const categoryItems = answerData.find(
        (item: any) => item.category === categoryValue
      )
      if (categoryItems) {
        isSubcategorySelected.value = true
        userAnswers.value[0] = categoryText
        selectedCategory.value = categoryText
        selectedSubcategoryItems.value = categoryItems.subCategories
        scrollToBottom()
      }
    }
    const scrollToBottom = (): void => {
      root.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight - 100)
      })
    }
    const selectedSubcategory = ref('')
    const isSubcategoryItemSelected = ref(false)
    const selectedSubcategoryAnswers = ref([])
    // 選択されたサブカテゴリが持つQ＆Aを表示する
    const showSubcategoryAnswers = (
      categoryValue: string,
      categoryText: string
    ) => {
      selectedSubcategoryAnswers.value = selectedSubcategoryItems.value.find(
        (item: any) => item.value === categoryValue
      ).answers
      userAnswers.value[1] = categoryText
      selectedSubcategory.value = categoryText
      isSubcategoryItemSelected.value = true
      scrollToBottom()
    }

    return {
      CATEGORIES,
      userAnswers,
      selectedSubcategory,
      isSubcategorySelected,
      selectedCategory,
      selectedSubcategoryItems,
      scrollToBottom,
      showSubcategories,
      isSubcategoryItemSelected,
      showSubcategoryAnswers,
      selectedSubcategoryAnswers
    }
  }
})
</script>

<style scoped>
/* チャット */
/* 回答者(アイコン) */
.card {
  /* width: 100%; */
  /* overflow: hidden; */
}
.card .faceicon {
  float: left;
  margin-right: -50px;
  width: 35px;
}
.card .faceicon img {
  width: 100%;
  height: auto;
  border-radius: 50%;
}
/* 回答者(コメント) */
.card .content {
  width: 95%;
  text-align: left;
}
.content {
  display: inline-block;
  position: relative;
  margin: 0 5px 0 50px;
  padding: 10px;
  /* max-width: 250px; */
  border-radius: 12px;
  background: #efefef;
}
.content:after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 3px;
  left: -19px;
  border: 8px solid transparent;
  border-right: 18px solid #efefef;
  -webkit-transform: rotate(35deg);
  transform: rotate(35deg);
}
.content div {
  margin: 0;
  padding: 0;
}

/* ユーザー(コメント) */
.user-comment {
  margin: 10px 0;
}
.user-comment p {
  display: inline-block;
  position: relative;
  margin: 0 10px 0 0;
  padding: 8px;
  max-width: 250px;
  border-radius: 12px;
  background: #a8dba8;
  font-size: 15px;
}
.user-comment p:after {
  content: '';
  position: absolute;
  top: 3px;
  right: -19px;
  border: 8px solid transparent;
  border-left: 18px solid #a8dba8;
  -webkit-transform: rotate(-35deg);
  transform: rotate(-35deg);
}
</style>
