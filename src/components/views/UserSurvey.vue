<script>
export default {
  name: 'UserSurvey',
  data() {
    return {
      userInfo: null,
    };
  },
  methods: {
    goBack() {
      this.$router.push('/');
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
    this.userInfo = this.usersInfo.filter((elem) => elem.info.seed === this.id);
  },
  watch: {
    id(newId) {
      this.userInfo = this.usersInfo.filter((elem) => elem.info.seed === newId);
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
  <div v-if="userInfo">
    <div class="container mt-5">
      <h2 class="mb-4">Анкета</h2>
      <div class="card">
        <div class="card-body">
          <button class="btn btn-secondary mb-3" @click="goBack">Назад</button>
          <div class="row">
            <div class="col-md-4">
              <img :src="userInfo[0]?.results[0].picture.large" alt="Фото" class="img-fluid mb-3">
            </div>
            <div class="col-md-8">
              <h2>
                  {{ `${userInfo[0]?.results[0].name.title}.
                ${userInfo[0]?.results[0].name.first}
                ${userInfo[0]?.results[0].name.last}` }}
              </h2>
              <p><strong>Gender:</strong> {{ userInfo[0]?.results[0].gender }}</p>
              <p><strong>Email:</strong> {{ userInfo[0]?.results[0].email }}</p>
              <p><strong>Location:</strong> {{ userInfo[0]?.results[0].location.city }},
                {{ userInfo[0]?.results[0].location.country }}</p>
              <p><strong>Phone:</strong> {{ userInfo[0]?.results[0].phone }}</p>
              <p><strong>Cell:</strong> {{ userInfo[0]?.results[0].cell }}</p>
              <p>
                <strong>Date of Birth:</strong>
                {{ userInfo[0]?.results[0].dob.date | formatDate }}
              </p>
              <p><strong>Age:</strong> {{ userInfo[0]?.results[0].dob.age }}</p>
              <p><strong>Registered Since:</strong>
                {{ userInfo[0]?.results[0].registered.date | formatDate }}</p>
              <p><strong>Location Coordinates:</strong> Lat:
                {{ userInfo[0]?.results[0].location.coordinates.latitude }},
                Long: {{ userInfo[0]?.results[0].location.coordinates.longitude }}
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
