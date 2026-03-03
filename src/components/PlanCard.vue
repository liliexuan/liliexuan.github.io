<template>
  <div class="plan-card-container">
    <el-card 
      class="plan-card"
      :class="{ 'expanded': isExpanded }"
      shadow="hover"
      @click.native="toggleExpand"
    >
      <div class="plan-card-header">
        <div class="plan-name">{{ plan.name }}</div>
        <div class="price-section">
          <div 
            v-if="plan.originalPrice > 0 && plan.originalPrice !== plan.discountedPrice" 
            class="original-price"
          >
            ¥{{ plan.originalPrice }}
          </div>
          <div class="discounted-price">
            ¥{{ plan.discountedPrice }}
          </div>
        </div>
      </div>

      <div class="features-section">
          <div class="section-title">套餐权益</div>
          <div class="features-list">
            <div 
              v-for="(feature, index) in plan.features" 
              :key="index"
              class="feature-item"
            >
              <el-tag 
                size="small" 
                type="primary" 
                effect="plain"
                class="feature-tag"
              >
                {{ feature }}
              </el-tag>
            </div>
          </div>
        </div>

        <el-divider v-if="plan.limits && plan.limits.length > 0" />

        <div v-if="plan.limits && plan.limits.length > 0" class="limits-section">
          <div class="section-title">用量限制</div>
          <div class="limits-list">
            <div 
              v-for="(limit, index) in plan.limits" 
              :key="index"
              class="limit-item"
            >
              <el-tag 
                size="small" 
                type="warning" 
                effect="plain"
                class="limit-tag"
              >
                {{ limit.type }}: {{ limit.value }} ({{ limit.refreshType }})
              </el-tag>
            </div>
          </div>
        </div>

        <el-divider v-if="plan.models && plan.models.length > 0" />

        <div v-if="plan.models && plan.models.length > 0" class="models-section">
          <div class="section-title">支持模型</div>
          <div class="models-list">
            <el-tag 
              v-for="(model, index) in plan.models" 
              :key="index"
              size="small" 
              type="success" 
              effect="plain"
              class="model-tag"
            >
              {{ model }}
            </el-tag>
          </div>
        </div>

        <div v-if="plan.scenarios && plan.scenarios.length > 0" class="card-footer-row">
          <div class="left-section">
            <div class="section-title">适用场景</div>
            <div class="scenarios-list">
              <el-tag 
                v-for="(scenario, index) in plan.scenarios" 
                :key="index"
                size="small" 
                type="info" 
                effect="plain"
                class="scenario-tag"
              >
                {{ scenario }}
              </el-tag>
            </div>
          </div>

          <div class="right-section">
            <el-collapse v-model="activeCollapse" @click.native.stop class="inline-collapse">
              <el-collapse-item 
                name="details"
                class="details-collapse"
              >
                <template slot="title">
                  <div class="collapse-title">
                    <span>查看详情</span>
                    <i 
                      class="el-icon-arrow-down collapse-icon"
                      :class="{ 'is-active': isExpanded }"
                    ></i>
                  </div>
                </template>
                <div class="details-content">
                  <div class="provider-info">
                    <span class="label">供应商:</span>
                    <span class="value">{{ provider.name }}</span>
                  </div>
                  <div class="plan-id">
                    <span class="label">套餐 ID:</span>
                    <span class="value">{{ plan.id }}</span>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
            <div class="action-divider"></div>
            <el-button 
              type="primary" 
              size="small"
              class="action-button"
              @click="handleNavigate"
            >
              前往了解
              <i class="el-icon-right"></i>
            </el-button>
          </div>
        </div>
    </el-card>
  </div>
</template>

<script>
import linksData from '@/config/links.json'

export default {
  name: 'PlanCard',
  props: {
    plan: {
      type: Object,
      required: true
    },
    provider: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isExpanded: false,
      activeCollapse: []
    }
  },
  computed: {
    planLink() {
      const links = linksData.links
      const planLink = links.plans && links.plans[this.plan.id]
      if (planLink) {
        return planLink
      }
      const defaultLink = links.default && links.default[this.plan.providerId]
      return defaultLink || '#'
    }
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded
      this.activeCollapse = this.isExpanded ? ['details'] : []
    },
    handleNavigate() {
      if (this.planLink && this.planLink !== '#') {
        window.open(this.planLink, '_blank')
      }
    }
  }
}
</script>

<style scoped>
.plan-card-container {
  width: 100%;
  /* padding: 10px; */
  box-sizing: border-box;
  min-width: 0;
}

.plan-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  background: #ffffff;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

.plan-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.2);
}

.plan-card.expanded {
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.plan-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
  flex-shrink: 0;
}

.plan-name {
  flex: 1;
  font-size: 1.1rem;
  font-weight: 600;
  color: #303133;
  line-height: 1.4;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}

.original-price {
  font-size: 0.85rem;
  color: #909399;
  text-decoration: line-through;
  text-decoration-color: #f56c6c;
}

.discounted-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f56c6c;
  line-height: 1;
}

.section-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #606266;
  margin-bottom: 12px;
  padding-left: 8px;
  border-left: 3px solid #667eea;
  flex-shrink: 0;
  white-space: nowrap;
}

.features-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  min-width: 0;
}

.feature-item {
  flex-shrink: 0;
}

.feature-tag {
  width: auto;
  max-width: 100%;
  box-sizing: border-box;
  text-align: left;
  height: auto;
  min-height: auto;
  padding: 6px 12px;
  line-height: 1.5;
  font-size: 0.8rem;
  border-color: #667eea;
  color: #667eea;
  word-break: break-word;
  white-space: nowrap;
  display: inline-block;
}

.limits-list,
.models-list,
.scenarios-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  min-width: 0;
}

.limit-item,
.model-tag,
.scenario-tag {
  flex-shrink: 0;
}

.limit-tag {
  border-color: #e6a23c;
  color: #e6a23c;
  word-break: break-word;
  white-space: nowrap;
  padding: 6px 12px;
  height: auto;
  min-height: auto;
}

.model-tag {
  border-color: #67c23a;
  color: #67c23a;
  white-space: nowrap;
  padding: 6px 12px;
  height: auto;
}

.scenario-tag {
  border-color: #909399;
  color: #909399;
  white-space: nowrap;
  padding: 6px 12px;
  height: auto;
}

/* 底部行布局 - 左右结构 */
.card-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #ebeef5;
}

.left-section {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #606266;
  padding-left: 8px;
  border-left: 3px solid #667eea;
  line-height: 1;
  margin-bottom: 8px;
  flex-shrink: 0;
}

.scenarios-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
}

.scenario-tag {
  border-color: #dcdfe6;
  color: #606266;
  white-space: nowrap;
  padding: 4px 12px;
  height: auto;
  font-size: 0.8rem;
  background: #f5f7fa;
  border-radius: 4px;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.action-divider {
  width: 1px;
  height: 24px;
  background: #e4e7ed;
  flex-shrink: 0;
}

.inline-collapse {
  border: none;
  flex-shrink: 0;
}

.inline-collapse .el-collapse-item__header {
  padding: 6px 10px;
  font-size: 0.85rem;
  border: none;
  background: transparent;
  color: #909399;
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.inline-collapse .el-collapse-item__header:hover {
  background: rgba(102, 126, 234, 0.08);
  color: #667eea;
}

.collapse-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #909399;
}

.collapse-icon {
  transition: transform 0.3s ease;
  font-size: 0.85rem;
}

.collapse-icon.is-active {
  transform: rotate(180deg);
}

.details-content {
  padding: 8px 0;
}

.provider-info,
.plan-id {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
  font-size: 0.8rem;
}

.provider-info:last-child,
.plan-id:last-child {
  margin-bottom: 0;
}

.label {
  color: #909399;
  font-weight: 500;
}

.value {
  color: #606266;
}

.action-button {
  height: 32px;
  padding: 0 18px;
  font-size: 0.85rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: #ffffff;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* 响应式：小屏幕时改为纵向排列 */
@media (max-width: 768px) {
  .card-footer-row {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .left-section {
    width: 100%;
  }
  
  .scenarios-list {
    width: 100%;
  }
  
  .right-section {
    width: 100%;
    justify-content: space-between;
    border-top: 1px solid #f0f0f0;
    padding-top: 12px;
    margin-top: 8px;
  }
  
  .action-divider {
    display: none;
  }
  
  .action-button {
    justify-content: center;
  }
}

.model-tag {
  border-color: #67c23a;
  color: #67c23a;
}

.scenario-tag {
  border-color: #909399;
  color: #909399;
}

.details-collapse {
  border-top: none;
}

.details-collapse .el-collapse-item__header {
  padding: 8px 0;
  font-size: 0.85rem;
  border-bottom: none;
}

.collapse-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 0.85rem;
  color: #909399;
}

.collapse-icon {
  transition: transform 0.3s ease;
  font-size: 0.85rem;
}

.collapse-icon.is-active {
  transform: rotate(180deg);
}

.details-content {
  padding: 8px 0;
}

.provider-info,
.plan-id {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
  font-size: 0.8rem;
}

.provider-info:last-child,
.plan-id:last-child {
  margin-bottom: 0;
}

.label {
  color: #909399;
  font-weight: 500;
}

.value {
  color: #606266;
}

.plan-card-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 0;
  border-top: none;
}

.action-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  padding: 10px 24px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.action-button:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.el-divider {
  margin: 16px 0;
}

@media (max-width: 767px) {
  .plan-card-header {
    flex-direction: column;
    gap: 12px;
  }

  .price-section {
    align-items: flex-start;
  }

  .plan-name {
    font-size: 1rem;
  }

  .discounted-price {
    font-size: 1.3rem;
  }

  .feature-tag {
    font-size: 0.8rem;
    padding: 6px 10px;
  }
}
</style>
