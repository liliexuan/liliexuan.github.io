<template>
  <div class="provider-nav-container">
    <div class="provider-nav-content">
      <div class="nav-item"
        v-for="(provider, index) in providersWithPlans"
        :key="provider.id"
        :class="{ 'active': activeProvider === provider.id }"
        @click="scrollToProvider(provider.id)"
        @mouseenter="hoveredProvider = provider.id"
        @mouseleave="hoveredProvider = null"
      >
        <div class="nav-item-inner">
          <div class="provider-info">
            <span class="provider-name">{{ provider.name }}</span>
            <el-badge 
              :value="provider.planCount" 
              :max="99"
              class="plan-badge"
              type="primary"
            />
          </div>
          <div class="plan-count">{{ provider.planCount }} 个套餐</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import providersData from '@/data/providers.json'
import plansData from '@/data/plans.json'

export default {
  name: 'ProviderNav',
  data() {
    return {
      providers: providersData.providers,
      plans: plansData.plans,
      activeProvider: '',
      hoveredProvider: ''
    }
  },
  computed: {
    providersWithPlans() {
      return this.providers.map(provider => {
        const planCount = this.plans.filter(
          plan => plan.providerId === provider.id
        ).length
        return {
          ...provider,
          planCount
        }
      })
    }
  },
  mounted() {
    this.initActiveProvider()
    this.setupScrollListener()
  },
  beforeUnmount() {
    this.removeScrollListener()
  },
  methods: {
    initActiveProvider() {
      if (this.providersWithPlans.length > 0) {
        this.activeProvider = this.providersWithPlans[0].id
      }
    },
    scrollToProvider(providerId) {
      const targetElement = document.getElementById(`provider-${providerId}`)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        })
        this.activeProvider = providerId
      }
    },
    setupScrollListener() {
      this.handleScroll = this.handleScroll.bind(this)
      window.addEventListener('scroll', this.handleScroll)
    },
    removeScrollListener() {
      if (this.handleScroll) {
        window.removeEventListener('scroll', this.handleScroll)
      }
    },
    handleScroll() {
      const sections = this.providersWithPlans.map(p => 
        document.getElementById(`provider-${p.id}`)
      )
      
      const viewportMiddle = window.innerHeight / 2
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
            this.activeProvider = this.providersWithPlans[i].id
            break
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.provider-nav-container {
  width: 100%;
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

.provider-nav-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 15px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.nav-item {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  padding: 12px 16px;
  background: #f5f7fa;
  border: 2px solid transparent;
  min-width: 0;
}

.nav-item:hover {
  background: rgba(102, 126, 234, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.nav-item.active {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-color: #667eea;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.25);
}

.nav-item-inner {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.provider-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.provider-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #303133;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.plan-badge {
  flex-shrink: 0;
}

.plan-badge:deep(.el-badge__content) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  font-size: 0.75rem;
  padding: 0 6px;
  height: 20px;
  line-height: 20px;
}

.plan-count {
  font-size: 0.8rem;
  color: #909399;
  text-align: center;
}

.nav-item.active .plan-count {
  color: #667eea;
  font-weight: 500;
}

@media (max-width: 768px) {
  .provider-nav-content {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    padding: 12px 15px;
    gap: 10px;
  }
  
  .nav-item {
    padding: 10px 12px;
  }
  
  .provider-name {
    font-size: 0.85rem;
  }
  
  .plan-count {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .provider-nav-content {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
