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

      <div class="plugin-section">
        <el-alert
          class="plugin-alert"
          type="info"
          :closable="false"
          show-icon
        >
          <template slot="title">
            <div class="plugin-header">
              <span class="plugin-name">Coding Plans for Copilot</span>
              <el-tag type="success" size="medium">推荐插件</el-tag>
            </div>
          </template>
          
          <div class="plugin-content">
            <p class="plugin-description">
              VS Code 扩展，帮助接入不同厂商的编码套餐到 Copilot Chat
            </p>
            
            <div class="plugin-reasons">
              <div class="reasons-title">推荐理由：</div>
              <ul class="reasons-list">
                <li><i class="el-icon-check"></i> 一键接入多家供应商的编码套餐服务</li>
                <li><i class="el-icon-check"></i> 在 Copilot Chat 中直接使用套餐额度</li>
                <li><i class="el-icon-check"></i> 支持自动切换模型和智能路由</li>
                <li><i class="el-icon-check"></i> 兼容主流 AI 编码工具（Claude Code、Cursor 等）</li>
              </ul>
            </div>

            <div class="plugin-action">
              <el-button 
                type="primary" 
                size="large"
                class="install-btn"
                @click="handleInstall"
              >
                <i class="el-icon-download"></i>
                立即安装
              </el-button>
              <el-button 
                type="text"
                class="learn-more-btn"
                @click="handleLearnMore"
              >
                了解更多 <i class="el-icon-arrow-right"></i>
              </el-button>
            </div>
          </div>
        </el-alert>
      </div>
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
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}`
    }
  },
  methods: {
    handleInstall() {
      window.open('https://marketplace.visualstudio.com/items?itemName=coding-plans-copilot', '_blank')
    },
    handleLearnMore() {
      window.open('https://github.com/coding-plans-copilot', '_blank')
    }
  }
}
</script>

<style scoped>
.header-container {
  width: 100%;
  padding: 30px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
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
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.stat-content {
  display: flex;
  align-items: center;
  padding: 10px;
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
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #303133;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  color: #909399;
  font-weight: 500;
}

.plugin-section {
  margin-top: 20px;
}

.plugin-alert {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border: none;
  border-radius: 12px;
  padding: 20px;
}

.plugin-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.plugin-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #303133;
}

.plugin-description {
  font-size: 1rem;
  color: #606266;
  margin: 0 0 20px 0;
  line-height: 1.6;
}

.plugin-reasons {
  margin-bottom: 20px;
}

.reasons-title {
  font-size: 1rem;
  font-weight: 600;
  color: #303133;
  margin-bottom: 12px;
}

.reasons-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 10px;
}

.reasons-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #606266;
  padding: 8px 12px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 6px;
  transition: all 0.2s ease;
}

.reasons-list li:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateX(5px);
}

.reasons-list li i {
  color: #67c23a;
  font-weight: bold;
  flex-shrink: 0;
}

.plugin-action {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.install-btn {
  height: 45px;
  padding: 0 30px;
  font-size: 1.05rem;
  font-weight: 600;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s ease;
}

.install-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.learn-more-btn {
  font-size: 0.95rem;
  color: #667eea;
  font-weight: 500;
  transition: all 0.2s ease;
}

.learn-more-btn:hover {
  color: #764ba2;
  transform: translateX(5px);
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

  .plugin-name {
    font-size: 1.2rem;
  }

  .reasons-list {
    grid-template-columns: 1fr;
  }

  .plugin-action {
    flex-direction: column;
    align-items: stretch;
  }

  .install-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
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
