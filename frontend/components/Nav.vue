<template>
  <section>
    <nav v-click-outside="closeMenu">
      <figure class="logo">
        <NuxtLink to="/">
          <img src="@/assets/logo.png" alt="logo" />
        </NuxtLink>
      </figure>
      <section class="nav-links">
        <NuxtLink class="link" to="/">Learn</NuxtLink>
        <NuxtLink class="link" to="/earn">Earn</NuxtLink>
<!--        <NuxtLink class="link" to="/discover?type=tools">Discover</NuxtLink>-->
<!--        <NuxtLink class="link" to="/docs">Docs</NuxtLink>-->
        <a href="https://docs.eosnetwork.com" target="_blank" rel="noopener noreferrer" class="link">Docs</a>
      </section>
      <section class="account" v-if="loading"></section>
      <section class="account" v-else>
        <Button v-if="!user" @click.native="signIn">Login</Button>
        <section v-else>
          <section class="profile">
            <figure class="avatar" @click="menuOpen = !menuOpen">
              <img :src="user.graphics.avatar" referrerpolicy="no-referrer" />
            </figure>
            <figure class="chevron" :class="{'flipped':menuOpen}" @click="menuOpen = !menuOpen">
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.9153 1.41663L8.99862 8.54163L1.08195 1.41663" stroke="#444444" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </figure>
            <section class="profile-menu" v-if="menuOpen">
              <RouterLink @click.native="menuOpen = false" :to="`/profile/${user.id}`" class="link">Go to Profile</RouterLink>
<!--              <figure class="link">Settings</figure>-->
              <figure class="link" @click="signOut">Log Out</figure>
            </section>
            <!--          <Button @click.native="signOut">Sign out</Button>-->
          </section>
        </section>
      </section>
      <section class="hamburger">
        <figure @click="hamburgerOpen = !hamburgerOpen">
          <Hamburger />
        </figure>
      </section>
      <section class="floating-menu" :class="{'open':hamburgerOpen}">
        <section class="hamburger">
          <figure @click="hamburgerOpen = !hamburgerOpen">
            <Hamburger />
          </figure>
        </section>
        <section class="nav-links">
          <NuxtLink @click.native="hamburgerOpen = false" class="link" to="/">Learn</NuxtLink>
          <NuxtLink @click.native="hamburgerOpen = false" class="link" to="/earn">Earn</NuxtLink>
          <!--        <NuxtLink @click.native="hamburgerOpen = false" class="link" to="/discover?type=tools">Discover</NuxtLink>-->
          <a href="https://docs.eosnetwork.com"  target="_blank" rel="noopener noreferrer" @click.native="hamburgerOpen = false" class="link">Docs</a>
        </section>
      </section>
    </nav>
    <figure class="nav-spacer"></figure>
  </section>
</template>

<script>
  export default {
    data(){return {
      loading:true,
      loggedIn:false,
      menuOpen:false,
      hamburgerOpen:false,
    }},
    computed:{
      user(){ return this.$store.state.user },
    },
    async beforeCreate() {
      if(await this.$api.isLoggedIn()){
        if(await this.$api.getUser()) {
          this.loggedIn = true;
        }
      } else {
        if(this.$auth.loggedIn){
          await this.$auth.logout()
        }
      }
      this.loading =  false;
    },
    methods: {
      closeMenu(){
        this.menuOpen = false;
      },
      async signIn() {
        if(process.client) localStorage.setItem("callbackredirect", location.href);
        await this.$auth.loginWith('auth0');
      },
      async signOut(){
        if(process.client) localStorage.setItem("callbackredirect", location.href);
        await this.$auth.logout();
        this.menuOpen = false;
      }
    },
  }
</script>

<style lang="scss" scoped>
  // Must always match the height of the nav
  .nav-spacer {
    height:104px;
  }

  $breakpoint:960px;

  nav {
    position: fixed;
    width:100vw;
    display: flex;
    align-items: center;
    margin:0;
    padding:20px 100px;
    background:#fff;
    z-index: var(--nav-index);
    height:104px;

    @media only screen and (max-width : 960px) {
      padding:20px 20px;
    }

    .hamburger {
      display:none;
      @media only screen and (max-width : $breakpoint) {
        display: inline-block;
        padding-left:20px;
        stroke:#000000;
        padding-top:6px;
      }
    }

    .logo {
      width:40px;
      height:40px;
    }

    .nav-links {
      flex:1;
      padding:0 20px 0 30px;
      display:flex;
      align-items: center;
      justify-content: flex-start;

      @media only screen and (max-width : $breakpoint) {
        padding:0 20px 0 10px;
      }

      .link {
        margin:0 15px;
        padding:10px;
        font-size:1.2rem;
        text-decoration:none;
        cursor:pointer;
        color:rgba(0,0,0,0.5);
        font-family: "SuisseIntlBold", sans-serif;

        transition: color 0.2s ease;

        @media only screen and (max-width : $breakpoint) {
          //font-size:1rem;
          //margin:0 5px;
          //padding:10px;

          display: none;
        }


        &.nuxt-link-exact-active, &:hover {
          color:var(--color-primary);
        }
      }
    }


    .floating-menu {
      display:none;

      position:fixed;
      top:0;
      left:0;
      right:0;
      bottom:0;
      background:#000000;

      z-index: var(--mobile-menu-index);

      .hamburger {
        stroke:#ffffff;
        display:flex;
        align-items:center;
        padding:33px 20px;
        justify-content: flex-end;
      }

      &.open {
        display: block;
      }

      .nav-links {
        display: block;

        .link {
          color:#ffffff;
          display: block;
          font-size: 2rem;
          padding:20px 20px;
        }
      }
    }

    .account {
      button {
        height:64px;
        @media only screen and (max-width : $breakpoint) {
          height:40px;
          padding: 0 10px;
        }
      }


      .profile {
        display:flex;
        align-items: center;
        position: relative;
        cursor: pointer;

        .avatar {
          position: relative;
          width:50px;
          height:50px;
          border-radius:50%;
          background-size: cover;
          background:rgba(0,0,0,0.1);
          overflow: hidden;

          @media only screen and (max-width : $breakpoint) {
            width:40px;
            height:40px;
          }

          img {
            width:100%;
            height:100%;
            object-fit: cover;
          }
        }

        .chevron {
          padding-left:20px;

          @media only screen and (max-width : $breakpoint) {
            display:none;
          }

          svg {
            transition: transform 0.2s ease;
          }

          &.flipped {
            svg {
              transform: rotate(180deg);
            }
          }
        }

        .profile-menu {
          top:50px;
          right:0;
          position:absolute;
          z-index:2;
          background:white;
          border-radius:var(--radius);
          width:150px;
          padding:20px;
          box-shadow:0 2px 10px rgba(0,0,0,0.05);

          .link  {
            cursor: pointer;

            &:not(:first-child){
              margin-top:10px;
              padding-top:10px;
              border-top:1px solid rgba(0,0,0,0.1);
            }

            &:last-child {
              color:var(--color-red);
            }
          }
        }
      }
    }
  }
</style>
