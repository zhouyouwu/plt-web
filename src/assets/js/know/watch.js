import {mapState} from 'vuex'

export default {
    name: "k-watch",
    data() {
        return {
            carouselData: [],
            refresh: true,
            total: 0,
            page: 1,
            typeId: '',
            options: []
        }
    },
    created(){
        this.getQuestion();
        this.getQuestionType()
    },
    computed: {
        ...mapState([
            'documentClientHeight',
        ]),
        siteContentViewHeight() {
            return this.documentClientHeight - 200 - 20;
        },
        siteCarouselViewHeight() {
            return this.documentClientHeight - 200;
        }
    },
    methods: {
        getQuestion() {
            let vm = this;
            vm.$axios.get(vm.GLOBAL.Knowledge + 'knowledge', {
                params: {
                    page: this.page,
                    size: 10,
                    typeId: this.typeId
                }
            }).then(res => {
                if (res.status && res.data.code === 0) {
                    this.carouselData = [];
                    this.total = res.data.result.total;
                    res.data.result.list.forEach(o => {
                        this.carouselData.push(o.knowUrl+"\\"+o.knowId+".html");
                    })
                }
            })
        },
        changePage(val) {
            this.page = val;
            this.getQuestion();
        },
        getQuestionType() {
            let vm = this;
            vm.$axios.get(vm.GLOBAL.Knowledge + 'type').then(res => {
                if (res.status && res.data.code === 0) {
                    this.options = res.data.result;
                }
            })
        },
    }

}
