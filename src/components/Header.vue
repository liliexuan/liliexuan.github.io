<template>
  <div class="header-container">
    <div class="header-content">
      <div class="title-section">
        <h1 class="main-title">编码套餐看板</h1>
        <p class="subtitle">仅展示各供应商公开页面可解析到的标准月费与备注信息</p>
      </div>

      <el-row :gutter="20" class="stats-row">
        <el-col :xs="24" :sm="8" :md="8">
          <el-card class="stat-card" shadow="hover">
            <div class="stat-content">
              <div class="stat-icon providers-icon">
                <i class="el-icon-office-building"></i>
              </div>
              <div class="stat-info">
                <div class="stat-value">{{ providerCount }}</div>
                <div class="stat-label">提供商数量</div>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :xs="24" :sm="8" :md="8">
          <el-card class="stat-card" shadow="hover">
            <div class="stat-content">
              <div class="stat-icon plans-icon">
                <i class="el-icon-shopping-bag-1"></i>
              </div>
              <div class="stat-info">
                <div class="stat-value">{{ planCount }}</div>
                <div class="stat-label">套餐数量</div>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :xs="24" :sm="8" :md="8">
          <el-card class="stat-card" shadow="hover">
            <div class="stat-content">
              <div class="stat-icon time-icon">
                <i class="el-icon-time"></i>
              </div>
              <div class="stat-info">
                <div class="stat-value">{{ generatedTime }}</div>
                <div class="stat-label">生成时间</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import providersData from '@/data/providers.json'
import plansData from '@/data/plans.json'

export default {
  name: 'Header',
  data() {
    return {
      providers: providersData.providers,
      plans: plansData.plans
    }
  },
  computed: {
    providerCount() {
      return this.providers.length
    },
    planCount() {
      return this.plans.length
    },
    generatedTime() {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
  }
}
</script>

<style scoped>
.header-container {
  width: 100%;
  padding: 5px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.header-grid {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 30px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.title-section {
  text-align: center;
  margin-bottom: 30px;
}

.main-title {
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 2px;
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin: 0;
  font-weight: 400;
}

.stats-row {
  margin-bottom: 30px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  transition: all 0.3s ease;
  margin-bottom: 15px;
  height: 100%;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.stat-content {
  display: flex;
  align-items: center;
  padding: 10px;
  height: 100%;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.stat-icon i {
  font-size: 28px;
  color: #ffffff;
}

.providers-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.plans-icon {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.time-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-info {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #303133;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-label {
  font-size: 0.9rem;
  color: #909399;
  font-weight: 500;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .header-container {
    padding: 20px 15px;
  }

  .main-title {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .stat-value {
    font-size: 1.6rem;
  }

  .stat-icon {
    width: 50px;
    height: 50px;
  }

  .stat-icon i {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 15px 10px;
  }

  .main-title {
    font-size: 1.5rem;
  }
  
  .stat-content {
    flex-direction: column;
    text-align: center;
  }

  .stat-icon {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>
