<template>
  <q-drawer v-model="leftDrawerOpen" show-if-above bordered elevated>
    <q-list class="q-pt-md">
      <q-item clickable :to="{ name: 'Dashboard' }" active-class="bg-primary glossy text-white" class="text-primary">
        <q-item-section avatar>
          <q-icon name="dashboard" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Dashboard</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable :to="{ name: 'GatewaysManagement' }" active-class="bg-primary glossy text-white" class="text-primary">
        <q-item-section avatar>
          <q-icon name="devices" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Device Management</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable :to="{ name: 'SchedulingManagement' }" active-class="bg-primary glossy text-white" class="text-primary">
        <q-item-section avatar>
          <q-icon name="format_list_bulleted" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Scheduling Management</q-item-label>
        </q-item-section>
      </q-item>
      <!-- <q-item clickable :to="{ name: 'Setting' }" active-class="bg-primary glossy text-white" class="text-primary">
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Setting</q-item-label>
        </q-item-section>
      </q-item> -->
      <q-item clickable :to="{ name: 'UserManagement' }" active-class="bg-primary glossy text-white" class="text-primary">
        <q-item-section avatar>
          <q-icon name="account_circle" />
        </q-item-section>
        <q-item-section>
          <q-item-label>User Management</q-item-label>
        </q-item-section>
      </q-item>
      <q-item @click="signOut" clickable class="text-primary">
        <q-item-section avatar>
          <q-icon name="login" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Log Out</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  computed: {
    leftDrawerOpen: {
      get () {
        return this.$store.state.DrawerOpen
      },
      set () {
        this.$store.commit('ToggleDrawer')
      }
    }
  },
  methods: {
    ...mapActions('user', [
      'SignOut'
    ]),
    signOut () {
      this
        .SignOut()
        .then(result => {
          this.$router.push({ name: 'Login' })
          this._showSuccessNotify('Success Log Out.')
        })
        .catch(error => {
          this._showErrorNotify(`Error: ${error.message}`)
          console.log('SignOut', error)
        })
    }
  }
}
</script>
