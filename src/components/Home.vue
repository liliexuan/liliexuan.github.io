<template>
  <el-container class="home-container">
    <el-main class="main-content">
      <Header />

      <ProviderNav />

      <div class="back-to-top" @click="scrollToTop" title="返回顶部">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>
        </svg>
      </div>

      <div class="plans-section">
        <section 
          v-for="(group, index) in groupedPlans" 
          :key="group.provider.id"
          :id="`provider-${group.provider.id}`"
          class="provider-section"
        >
          <div class="provider-header">
            <h2 class="provider-title">{{ group.provider.name }}</h2>
            <p class="provider-description">{{ group.provider.description }}</p>
            <el-link 
              :href="group.provider.website" 
              type="primary" 
              target="_blank"
              class="provider-website"
            >
              访问官网 <i class="el-icon-external-link"></i>
            </el-link>
          </div>

          <div class="plans-grid">
            <div 
              v-for="plan in group.plans" 
              :key="plan.id"
              class="plan-col"
            >
              <PlanCard 
                :plan="plan" 
                :provider="group.provider" 
              />
            </div>
          </div>
        </section>

        <el-empty 
          v-if="groupedPlans.length === 0" 
          description="暂无套餐数据"
          class="empty-state"
        />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Header from './Header.vue'
import ProviderNav from './ProviderNav.vue'
import PlanCard from './PlanCard.vue'
import providersData from '@/data/providers.json'
import plansData from '@/data/plans.json'
import linksData from '@/config/links.json'

export default {
  name: 'Home',
  components: {
    Header,
    ProviderNav,
    PlanCard
  },
  data() {
    return {
      providers: providersData.providers,
      plans: plansData.plans,
      links: linksData
    }
  },
  computed: {
    groupedPlans() {
      const groups = []
      
      for (const provider of this.providers) {
        const providerPlans = this.plans.filter(
          plan => plan.providerId === provider.id
        )
        
        if (providerPlans.length > 0) {
          groups.push({
            provider,
            plans: providerPlans
          })
        }
      }
      
      return groups
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      })
    },
    scrollToProvider(providerId) {
      const element = document.getElementById(`provider-${providerId}`)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: #f5f7fa;
}

.main-content {
  padding: 0;
  overflow-x: hidden;
  position: relative;
}

.back-to-top {
  position: fixed;
  right: 30px;
  bottom: 50px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  z-index: 100;
  color: #ffffff;
  font-size: 24px;
}

.back-to-top:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.back-to-top:active {
  transform: translateY(-2px);
}

.plans-section {
  padding: 20px 0px;
}

.provider-section {
  margin-bottom: 30px;
  scroll-margin-top: 20px;
}

.provider-section:last-child {
  margin-bottom: 0;
}

.provider-header {
  margin-bottom: 15px;
  padding: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
  color: #ffffff;
}

.provider-title {
  margin: 0 0 10px 0;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.provider-description {
  margin: 0 0 15px 0;
  font-size: 1rem;
  opacity: 0.95;
  line-height: 1.6;
}

.provider-website {
  color: #ffffff;
  font-weight: 500;
  transition: all 0.3s ease;
}

.provider-website:hover {
  opacity: 0.9;
  transform: translateX(5px);
}

.provider-website:deep(.el-link__inner) {
  color: #ffffff;
}

.plans-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin: 0;
  width: 100%;
}

.plan-col {
  min-width: 0;
  width: 100%;
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .plans-section {
    padding: 20px 15px;
  }

  .provider-header {
    padding: 15px;
  }

  .provider-title {
    font-size: 1.4rem;
  }

  .provider-description {
    font-size: 0.9rem;
  }

  .provider-section {
    margin-bottom: 30px;
  }
  
  .plans-grid {
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .plans-section {
    padding: 15px 10px;
  }

  .provider-title {
    font-size: 1.2rem;
  }
}
</style>
