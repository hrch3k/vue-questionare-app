// Create and setup your form here



<template>
  <div>
    <header class="vff-header">
      <div class="f-container">
        <!-- Add custom logo here -->
        <svg class="f-logo" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid meet"
          viewBox="0 0 35.606 11.211">
          <path d="M.134.837H3.21V8.01h4.203v2.18H.134V.837z" />
          <path
            d="M11.875.59c1.48 0 2.668.448 3.567 1.344s1.35 2.052 1.35 3.47c0 1.48-.445 2.7-1.336 3.632S13.38 10.45 11.9 10.45c-1.678 0-2.954-.54-3.827-1.622-.717-.9-1.08-2.022-1.09-3.397-.01-1.36.39-2.484 1.193-3.374C9.06 1.08 10.292.59 11.875.59zm0 2.283c-.563 0-1.003.222-1.323.662-.338.467-.507 1.124-.507 1.972 0 .865.162 1.524.487 1.978a1.58 1.58 0 0 0 1.369.682c.588 0 1.04-.223 1.355-.668s.474-1.07.474-1.875c0-1.834-.62-2.75-1.855-2.75z" />
          <path
            d="M21.565 7.078V5.055h4.217v5.163h-1.986l-.13-.908c-.693.76-1.617 1.142-2.777 1.142-1.383 0-2.488-.437-3.313-1.3s-1.243-2.03-1.252-3.464c-.01-1.462.385-2.65 1.18-3.567.875-1.012 2.11-1.518 3.7-1.518 1.21 0 2.207.303 3 .907s1.264 1.457 1.447 2.556h-2.92c-.207-.787-.73-1.182-1.57-1.182-.553 0-.988.236-1.303.707s-.475 1.153-.475 2.043c0 1.695.652 2.542 1.96 2.542.363 0 .695-.103.998-.306a1.29 1.29 0 0 0 .572-.784h-1.35v.002z" />
          <path
            d="M30.556.59c1.48 0 2.668.448 3.568 1.344s1.348 2.052 1.348 3.47c0 1.48-.443 2.7-1.336 3.632S32.06 10.45 30.58 10.45c-1.678 0-2.953-.54-3.826-1.622-.72-.892-1.082-2.022-1.1-3.398-.008-1.357.39-2.48 1.193-3.372C27.74 1.08 28.974.59 30.556.59zm0 2.283c-.563 0-1.002.222-1.322.662-.336.467-.506 1.125-.506 1.972 0 .865.162 1.524.486 1.978s.78.682 1.37.682 1.04-.223 1.355-.668.475-1.07.475-1.875c-.002-1.834-.62-2.75-1.857-2.75z" />
        </svg>
      </div>
    </header>




    <flow-form ref="flowform" v-on:complete="onComplete" v-on:submit="onSubmit" v-bind:questions="questions"
      v-bind:language="language" v-bind:standalone="true">
      <!-- Custom content for the Complete/Submit screen slots in the FlowForm component -->
      <!-- We've overriden the default "complete" slot content -->

      <template v-slot:complete>

        <div class="f-section-wrap" v-if="!submitted">
          <p>
            <span class="fh2">Hvala za sodelovanje. 🙏</span>
            <span class="f-section-text">
              S klikom na spodnji gumb oddajte zbrane odgovore.
            </span>
          </p>
          <p class="f-description"></p>
        </div>

      </template>

      <!-- We've overriden the default "completeButton" slot content -->
      <template v-slot:completeButton>
        <div class="f-submit" v-if="!submitted">
          <button class="o-btn-action" ref="button" type="submit" href="#" v-on:click.prevent="onSendData()"
            aria-label="Press to submit">
            <span>{{ language.submitText }}</span>
          </button>
          <a class="f-enter-desc" href="#" v-on:click.prevent="onSendData()"
            v-html="language.formatString(language.pressEnter)">
          </a>
        </div>

        <div class="f-submit" v-if="submitted">
          <button class="o-btn-action" ref="button" type="submit" href="#" v-on:click.prevent="startAgain()"
            aria-label="Start again">
            <span>{{ language.startAgain }}</span>
          </button>
          <a class="f-enter-desc" href="#" v-on:click.prevent="onSendData()"
            v-html="language.formatString(language.pressEnter)">
          </a>
        </div>

        <p class="text-success" v-if="submitted">Submitted succesfully.</p>

      </template>

    </flow-form>

  </div>
</template>


<script>
/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://www.ditdot.hr/en
*/

// Import necessary components and classes
import FlowForm from '../../src/components/FlowForm.vue'
import QuestionModel, { QuestionType, ChoiceOption, LinkOption } from '../../src/models/QuestionModel'
import LanguageModel from '../../src/models/LanguageModel'
// If using the npm package, use the following line instead of the ones above.
// import FlowForm, { QuestionModel, QuestionType, ChoiceOption, LanguageModel } from '@ditdot-dev/vue-flow-form'
import Carousel from './Carousel.vue'

export default {
  name: 'example',

  components: {
    FlowForm, Carousel
  },

  data() {
    return {
      submitted: false,
      completed: false,
      language: new LanguageModel(),
      // Create question list with QuestionModel instances
      questions: [
        new QuestionModel({
          id: 'id',
          tagline: 'Prosimo odgovorite na par vprašanj',
          title: 'Za začetek vnesite svoj ID',
          type: QuestionType.Text,
          required: true,
          placeholder: 'Vnesite tukaj ...'


        }),
        new QuestionModel({
          id: 'a',
          tagline: "Pozdravljeni, prosim odgovorite na par vprašanj :)",
          title: 'Ali s podjetjem organizirate interne dogodke?',
          helpTextShow: false,
          type: QuestionType.MultiplePictureChoice,
          multiple: false,
          required: true,
          options: [
            new ChoiceOption({
              imageSrc: require('./assets/images/facebook.png'),
              imageAlt: 'Facebook logo',
              label: 'TEAMBUILDING DOGODKI',
              value: 'teambuilding'
            }),
            new ChoiceOption({
              imageSrc: require('./assets/images/twitter.png'),
              imageAlt: 'Twitter logo',
              label: 'INCENTIVE DOGODKI',
              value: 'incentive'
            }),
            new ChoiceOption({
              imageSrc: require('./assets/images/instagram.png'),
              imageAlt: 'Instagram logo',
              label: 'PREDSTAVITVE PODJETJA',
              value: 'predstavitve'
            }),
            new ChoiceOption({
              imageSrc: require('./assets/images/tiktok.png'),
              imageAlt: 'TikTok logo',
              label: 'VEČJI KORPORATIVNI DOGODKI',
              value: 'vecji_dogodki'
            }),
            new ChoiceOption({
              imageSrc: require('./assets/images/tiktok.png'),
              imageAlt: 'TikTok logo',
              label: 'DRUGI DOGODKI',
              value: 'drugi_dogodki'
            }),
          ],
          jump: {
            teambuilding: 'firstA',
            incentive: 'firstB',
            predstavitve: 'firstC',
            vecji_dogodki: 'firstD',
            drugi_dogodki: 'dogodek'
          }
        }),




        new QuestionModel({
          id: 'firstA',
          tagline: 'Kulinarična delavnica, obisk vinske kleti,športna aktivnost in druženje, ipd… 😊',
          title: 'Ali v vašem podjetju organizirate take dogodke?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Da',
              value: 'da'

            }),
            new ChoiceOption({
              label: 'Ne',
              value: 'ne'
            })

          ],
          jump: {
            da: 'kolikokrat',
            ne: 'c'
          }
        }),

        new QuestionModel({
          id: 'firstB',
          tagline: 'Ogled npr.športnega dogodka in kosilo/večerja, novoletna večerja z zabavnim programom, ipd… 😊',
          title: 'Ali v vašem podjetju organizirate take dogodke?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Da',
              value: 'da'

            }),
            new ChoiceOption({
              label: 'Ne',
              value: 'ne'
            })

          ],
          jump: {
            da: 'kolikokrat',
            ne: 'c'
          }




        }),
        new QuestionModel({
          id: 'firstC',
          tagline: 'Promocijska predstavitev na sejmu, stojnica na konferenci ali dogodku, ipd… 😊',
          title: 'Ali v vašem podjetju organizirate take dogodke?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Da',
              value: 'da'

            }),
            new ChoiceOption({
              label: 'Ne',
              value: 'ne'
            })

          ],
          jump: {
            da: 'kolikokrat_predstavitve',
            ne: 'c'
          }




        }),
        new QuestionModel({
          id: 'firstD',
          tagline: 'Dan prodajalcev, športni dan za vse zaposlene, workshop delavnice za vodstveni kader, itd 😊',
          title: 'Ali v vašem podjetju organizirate take dogodke?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Da',
              value: 'da'

            }),
            new ChoiceOption({
              label: 'Ne',
              value: 'ne'
            })

          ],
          jump: {
            da: 'kolikokrat',
            ne: 'c'
          }




        }),
        new QuestionModel({
          id: 'c',
          tagline: 'Hvala za odgovor 😊',
          title: 'Ali obstaja želja/možnost, da bi take dogodke organizirali?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Da',
              value: 'da'

            }),
            new ChoiceOption({
              label: 'Ne',
              value: 'ne'
            })

          ],
          jump: {
            da: '_submit',
            ne: '_submit'
          }




        }),
        new QuestionModel({
          id: 'kolikokrat',
          //tagline: 'Kolikokrat organizirate takšne dogodke',
          title: 'Kolikokrat organizirate takšne dogodke',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Enkrat na leto'
            }),
            new ChoiceOption({
              label: 'Dvakrat na leto'
            }),
            new ChoiceOption({
              label: 'Več kot dvakrat na leto '
            })
          ]
        }),
        new QuestionModel({
          id: 'zakoliko',
          //tagline: 'Kolikokrat organizirate takšne dogodke',
          title: 'Za koliko zaposlenih?',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Do 5 zaposlenih'
            }),
            new ChoiceOption({
              label: 'Do 20 zaposlenih'
            }),
            new ChoiceOption({
              label: 'Več kot 20 zaposlenih'
            })
          ],
          jump: {
            _other: '_submit'
          }
        }),
        new QuestionModel({
          id: 'kolikokrat_predstavitve',
          //tagline: 'Kolikokrat organizirate takšne dogodke',
          title: 'Kolikokrat organizirate takšne dogodke',
          helpTextShow: false,
          type: QuestionType.MultipleChoice,
          multiple: false,
          allowOther: false,
          required: true,
          options: [
            new ChoiceOption({
              label: 'Enkrat na leto'
            }),
            new ChoiceOption({
              label: 'Dvakrat na leto'
            }),
            new ChoiceOption({
              label: 'Več kot dvakrat na leto '
            })
          ],
          jump: {
            _other: '_submit'
          }
        }),
        new QuestionModel({
          id: 'dogodek',
          tagline: 'Vpišite dogodke ki jih izvajate',
          title: 'Ali v vašem podjetju izvajate dogodke, ki niso bili navedeni?',
          type: QuestionType.Text,
          required: true,
          placeholder: 'Vnesite tukaj ...',

        }),

        new QuestionModel({
          id: 'organizator',
          tagline: 'Kulinarična delavnica, obisk vinske kleti,športna aktivnost in druženje, ipd… 😊',
          title: 'Kdo v vašem podjetju je zadolžen za organizacijo dogodkov (ime in priimek)',
          type: QuestionType.Text,
          required: true,
          placeholder: 'Vnesite tukaj ...',
          jump: {
            _other: '_submit'
          }
        }),

      ]
    }
  },

  mounted() {
    document.addEventListener('keyup', this.onKeyListener)
  },

  beforeUnmount() {
    document.removeEventListener('keyup', this.onKeyListener)
  },

  methods: {
    onKeyListener($event) {
      // We've overriden the default "complete" slot so
      // we need to implement the "keyup" listener manually.

      if ($event.key === 'Enter' && this.completed && !this.submitted) {
        this.onSendData()
      }
    },

    /* eslint-disable-next-line no-unused-vars */
    onComplete(completed, questionList) {
      // This method is called whenever the "completed" status is changed.
      this.completed = completed
    },

    /* eslint-disable-next-line no-unused-vars */
    onSubmit(questionList) {
      // This method will only be called if you don't override the
      // completeButton slot.
      this.onSendData()
    },


    onSendData() {
      // Set `submitted` to true so the form knows not to allow back/forward
      // navigation anymore.
      this.$refs.flowform.submitted = true

      this.submitted = true

      /* eslint-disable-next-line no-unused-vars */
      const data = this.getData()
      console.log(data.answers)
      console.log(data)



      /*
        You can use Fetch API to send the data to your server, eg.:
*/
      fetch('http://localhost:3000/odgovori', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.answers)
      })
    },

    startAgain() {



      this.$refs.flowform.reset()

      this.$refs.flowform.submitted = false

      this.submitted = false
      this.$refs.flowform.goToQuestion(0)


    },

    getData() {
      const data = {
        questions: [],
        answers: []
      }

      this.questions.forEach(question => {
        if (question.title) {
          let answer = question.answer
          if (Array.isArray(answer)) {
            answer = answer.join(', ')
          }

          data.questions.push(question.title)
          data.answers.push(answer)
        }
      })

      return data
    }
  }
}
</script>

<style lang="css">
@import '../../src/assets/css/themes/theme-minimal.css';
/* If using the npm package, use the following lines instead of the one above */
/* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css'; */
/* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-minimal.css'; */
</style>