export const sidenav = [ //sidenav內容
  {
    name: '首頁',
    path: '/',
    icon: 'home',
  }/*,
  {
    name: '業務',
    path: '',
    icon: 'people',
    children: [
      {
        name: '治具需求單管理',
        path: '',
        icon: 'people',
        children: [
          {
            name: '治具需求單作業',
            path: '/internal-contact-list',
            //icon: 'arrow_right'
          }
        ]
      },
      {
        name: '部品零件贈送申請單',
        path: '/gift-application-list',
        icon: 'people'
      }
    ]
  }*/,
  {
    name: '專案計畫管理',
    path: '',
    icon: 'filter_none',
    children: [
      {
        name: '客需單管理',//A
        path: '/project-A',
        icon: 'people',
        children: [
          {
            name: '客需單申請作業',//A1
            path: '/project-request',
            //icon: 'arrow_right',
          },
          {
            name: '客需單事項追蹤作業',//A2
            path: '/project-request-task-schedule-query',
            //icon: 'arrow_right',
          },
        ]
      },
      {
        name: '專案計劃管理',
        path: 'projectinfo',
        icon: 'query_builder',
        children: [
          {
            name: '專案產銷會議',
            path: '/produce-sales-meeting',//B1
            //icon: 'arrow_right'
          },
          {
            name: '專案管理作業',//B2
            path: '/project-manager',
            //icon: 'arrow_right'
          },
          // {
          //   name: '專案計畫瀏覽',//B3
          //   path: '/project-plan-list',
          //   icon: 'arrow_right'
          // },
          {
            name: '專案範本管理',//B4
            path: '/project-template',
            //icon: 'arrow_right'
          },
          {
            name: '專案授權書',//B5
            path: '/project-audit-form',
            //icon: 'arrow_right'
          },
          /*
          {
            name: '任務延伸範本管理',//B6
            path: '/project-task-template',
            icon: 'arrow_right'
          },
          {//移到個人頁面
            name: '專案紀錄簿',//B7
            path: '/project-record-book',
            icon: 'arrow_right'
          },
          */
        ]
      },
      {
        name: '專案工時管理',//D
        path: '',
        icon: 'query_builder',
        children: [
          /*移到個人頁面
          {
            name: '個人工作時數表',//D1
            path: 'my-daily-works',
            icon: 'arrow_right'
          },
          */
          {
            name: '個人工時異動作業',//D2
            path: 'person-daily-work-modify',
            //icon: 'arrow_right'
          }
        ]
      },

      {
        name: '會議資訊服務',//E
        path: '/project-meeting-calendar',
        icon: 'label_important'
      },/*
      {
        name: '專案機台防毒安裝一覽表',//F
        path: '/virus-code-list',
        icon: 'label_important'
      },
      {
        name: '治具設計時程表',//G
        path: 'fixture-schedule-query',
        icon: 'label_importantt'
      },
      */
      {
        name: '專案任務工作查詢',//H
        path: 'project-info-task-all-query',
        icon: 'search',
      },
      {
        name: '專案驗收進度一覽表',//I
        path: 'project-date-list',
        icon: 'list_alt'
      },
      {
        name: '製造資訊管理',//C
        path: '/project-C',
        icon: 'build',
        children: [
          /*
          {
            name: '製令開啟通知作業(核准)',//C1
            path: '',
            icon: 'arrow_right',
          },
          */
          {
            name: '製令開啟通知作業',//C2
            path: '/project-info-manufacture-order-list',
            //icon: 'arrow_right',
          },
          {
            name: '製令資料查詢',//C3
            path: '/project-info-manufacture-order-query',
            //icon: 'arrow_right',
          },
        ]
      }/* ,
      {
        name: '專案任務工作回報',//I
        path: 'task-return',
        icon: 'list_alt'
      },
      {
        name: 'PM專案任務工作回報',//I
        path: 'pm-return',
        icon: 'list_alt'
      }*/,
      //移到個人頁面
      {
        name: '每日工作任務清單',//J
        path: 'person-today-list',
        icon: 'description'
      }

    ]
  }/*,
  {
    name: '客服',
    path: '',
    icon: 'local_phone',
    children: [
      {
        name: '下拉項目1',
        path: '/1',
        icon: 'settings'
      },
      {
        name: '下拉項目1',
        path: '/project',
        icon: 'settings'
      }
    ]
  },
  {
    name: '人資HR',
    path: '',
    icon: 'person',
    children: [
      {
        name: '下拉項目1',
        path: '/1',
        icon: 'settings'
      },
      {
        name: '下拉項目1',
        path: '/project',
        icon: 'settings'
      }
    ]
  },
  {
    name: '機台/物料',
    path: '',
    icon: 'device_hub',
    children: [
      {
        name: '下拉項目1',
        path: '/1',
        icon: 'settings'
      },
      {
        name: '下拉項目1',
        path: '/project',
        icon: 'settings'
      }
    ]
  },
  {
    name: '財務會計',
    path: '',
    icon: 'attach_money',
    children: [
      {
        name: '下拉項目1',
        path: '/1',
        icon: 'settings'
      },
      {
        name: '下拉項目1',
        path: '/project',
        icon: 'settings'
      }
    ]
  },
  {
    name: '內容服務',
    path: '',
    icon: 'room_service',
    children: [
      {
        name: '下拉項目1',
        path: '/1',
        icon: 'settings'
      },
      {
        name: '下拉項目1',
        path: '/project',
        icon: 'settings'
      }
    ]
  },
  {
    name: '統計',
    path: '',
    icon: 'multiline_chart',
    children: [
      {
        name: '下拉項目1',
        path: '/1',
        icon: 'settings'
      },
      {
        name: '下拉項目1',
        path: '/project',
        icon: 'settings'
      }
    ]
  },
  {
    name: '系統',
    path: '',
    icon: 'settings',
    children: [
      {
        name: '下拉項目1',
        path: '/1',
        icon: 'settings'
      },
      {
        name: '下拉項目1',
        path: '/project',
        icon: 'settings'
      }
    ]
  },
  {
    name: 'table範本',
    path: '/table',
    icon: 'edit',
  },
  {
    name: 'form表範本',
    path: '/form',
    icon: 'edit',
  },
  {
    name: 'icon範本',
    path: '/card',
    icon: 'edit',
  },
  {
    name: '下拉示範',
    path: '',
    icon: 'edit',
    children: [
      {
        name: '下拉項目1',
        path: '/1',
        icon: 'settings',
        children: [
          {
            name: '下拉項目1',
            path: '/1',
            icon: 'settings',
          },
          {
            name: '下拉項目2',
            path: '/2',
            icon: 'settings',
          }
        ]
      }]
  }*/
]
