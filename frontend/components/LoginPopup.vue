<template>
    <section class="login">
        <figure @click="closePopup" class="absolute bg-black opacity-75 inset-0 z-10"></figure>
        <section class="container text-center relative z-20">
            <figure class="font-bold text-xl">
                EOS Learn Portal
            </figure>
            <p class="text-xs text-gray-500 lg:px-10">
                Sign in to continue, if you don't have an account one will be created for you.
            </p>

            <!-- line with tailwind -->
            <hr class="my-8 border-gray-300" />

            <!-- google and github login buttons -->
            <section class="flex justify-center flex-col text-sm">
                <button v-on:click="googleSignIn" class="bg-black hover:bg-gray-700 text-white py-5 px-8 rounded inline-flex items-center">
                    <svg fill="#fff" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                         viewBox="0 0 210 210" xml:space="preserve">
                        <path d="M0,105C0,47.103,47.103,0,105,0c23.383,0,45.515,7.523,64.004,21.756l-24.4,31.696C133.172,44.652,119.477,40,105,40
                            c-35.841,0-65,29.159-65,65s29.159,65,65,65c28.867,0,53.398-18.913,61.852-45H105V85h105v20c0,57.897-47.103,105-105,105
                            S0,162.897,0,105z"/>
                    </svg>
                    <figure class="ml-4">Sign in with Google</figure>
                </button>
                <button v-on:click="githubSignIn" class="bg-black hover:bg-gray-700 text-white py-5 px-8 rounded inline-flex items-center">
                    <svg width="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

                        <title>github [#142]</title>
                        <desc>Created with Sketch.</desc>
                        <defs>

                        </defs>
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#fff">
                                <g id="icons" transform="translate(56.000000, 160.000000)">
                                    <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]">

                                    </path>
                                </g>
                            </g>
                        </g>
                    </svg>
                    <figure class="ml-4">Sign in with Github</figure>
                </button>
            </section>
        </section>
    </section>
</template>

<script>
export default {
    data(){return {
        checked: false,
    }},
    mounted() {
        if(!localStorage.getItem('checked')) {
            localStorage.setItem('checked', "false");
        }
        this.checked = JSON.parse(localStorage.getItem('checked'));
    },
    methods: {
        async closePopup() {
            await this.$store.dispatch('setLoginPopup', false);
        },
        // save checked value to local storage
        setChecked() {
            this.checked = !this.checked;
            localStorage.setItem('checked', JSON.stringify(this.checked));
        },
        async googleSignIn(){
            const result = await this.$firebase.signInWithGoogle();
            if(result) await this.finalizeLogin()
        },
        async githubSignIn(){
            const result = await this.$firebase.signInWithGitHub();
            if(result) await this.finalizeLogin()
        },
        async finalizeLogin(){
            await this.$api.getUser();
            await this.closePopup();
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    position:fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index:999999999999999999;
    padding: 80px 20px;
    display: flex;
    align-items: center;
    justify-content: center;


    .container {
        padding: 60px 30px;
        background-color: #fff;
        border-radius: 10px;
        margin: 0 auto;
        max-width: 400px;
    }
}
</style>
