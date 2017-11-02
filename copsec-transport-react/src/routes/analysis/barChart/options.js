let option=[
    {
      title: {
        y: 'top',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bolder',
          color: '#333'          // 主标题文字颜色
        },
        text: "运输许可审查材料抽查符合记录"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["不符合", "符合"]
      },
      grid: {
        x: 30,
        x2: 40,
        y2: 24
      },
      calculable: !0,
      xAxis: [{
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五"]
      }],
      yAxis: [{
        type: "value"
      }],
      series: [{
        name: "不符合",
        type: "bar",
        barWidth: '20%',
        data: [1, 0, 2, 1, 1],
        markPoint: {
          data: [{
            type: "max",
            name: "最大值"
          },
            {
              type: "min",
              name: "最小值"
            }]
        },
        markLine: {
          data: [{
            type: "average",
            name: "平均值"
          }]
        }
      },
        {
          name: "符合",
          type: "bar",
          barWidth: '20%',
          data: [8, 9, 7, 8, 8],
          markPoint: {
            data: [{
              type: "max",
              name: "最大值"
            },
              {
                type: "min",
                name: "最小值"
              }]
          },
          markLine: {
            data: [{
              type: "average",
              name: "平均值"
            }]
          }
        }]
    },
  {
    title: {
      textStyle: {
        fontSize: 16,
        fontWeight: 'bolder',
        color: '#333'          // 主标题文字颜色
      },
      text: "待审铁路运输企业行政许可审查项目明细报表"
    },
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: []
    },
    color:['#1A6C18'],
    grid: {
      x: 30,
      x2: 40,
      y2: 24
    },
    calculable: !0,
    xAxis: [{
      type: "category",
      data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    }],
    yAxis: [{
      type: "value"
    }],
    series: [{
      name: "数量",
      type: "bar",
      barWidth: '40%',
      data: [2, 3, 1,2, 1, 1, 2, 4, 1, 2, 1, 3],
      markPoint: {
        data: [{
          type: "max",
          name: "最大值"
        },
          {
            type: "min",
            name: "最小值"
          }]
      },
      markLine: {
        data: [{
          type: "average",
          name: "平均值"
        }]
      }
    } ]
  },
]

export default option
