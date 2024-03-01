<script>
export default {
  name: 'UserSurvey',
  data() {
    return {
      userInfo: null,
      person: null,
    };
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
    filterPersonsData(id) {
      this.userInfo = this.usersInfo.filter((elem) => elem.info.seed === id);
      this.person = this.userInfo && this.userInfo[0]?.results[0];
    },
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    usersInfo() {
      return this.$store.state.user;
    },
  },
  mounted() {
    this.filterPersonsData(this.id);
  },
  watch: {
    id(newId) {
      this.filterPersonsData(newId);
    },
  },
  filters: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>
<template>
  <div v-if="person">
    <div class="container pt-5">
      <h2 class="mb-4 text-white">Анкета</h2>
      <div class="card">
        <div class="card-body">
          <v-btn color="primary" outlined class="mb-3" @click="goBack">
            Назад
          </v-btn>
          <div class="row">
            <div class="col-md-4">
              <img :src="person.picture.large" alt="Фото" class="img-fluid mb-3">
            </div>
            <div class="col-md-8">
              <h2>
                {{ `${person.name.title}.
                ${person.name.first}
                ${person.name.last}` }}
              </h2>
              <p><strong>Gender:</strong> {{ person.gender }}</p>
              <p><strong>Email:</strong> {{ person.email }}</p>
              <p><strong>Location:</strong> {{ person.location.city }},
                {{ person.location.country }}</p>
              <p><strong>Phone:</strong> {{ person.phone }}</p>
              <p><strong>Cell:</strong> {{ person.cell }}</p>
              <p>
                <strong>Date of Birth:</strong>
                {{ person.dob.date | formatDate }}
              </p>
              <p><strong>Age:</strong> {{ person.dob.age }}</p>
              <p><strong>Registered Since:</strong>
                {{ person.registered.date | formatDate }}</p>
              <p><strong>Location Coordinates:</strong> Lat:
                {{ person.location.coordinates.latitude }},
                Long: {{ person.location.coordinates.longitude }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
