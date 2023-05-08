export const projectData =[
    { task_code:'BM1000-0001',task_name:'機台產銷會議',labor_hour:'2020-04-14~2020-04-15',re_data:'2020-04-18',com_date:'2020-04-18',description:'回復'},
    { task_code:'BM1000-0001',task_name:'專案負責',labor_hour:'2020-04-14~2020-04-15',re_data:'2020-04-18',com_date:'2020-04-18',description:'已召開'},
    { task_code:'BM1000-0001',task_name:'專案負責',labor_hour:'2020-04-14~2020-04-15',re_data:'2020-04-19',com_date:'2020-04-19',description:'已召開'},
    { task_code:'BM1000-0001',task_name:'專案負責',labor_hour:'2020-04-14~2020-04-15',re_data:'2020-04-20',com_date:'2020-04-20',description:'已召開'},
    { task_code:'BM1000-0001',task_name:'專案負責',labor_hour:'2020-04-14~2020-04-15',re_data:'2020-04-25',com_date:'2020-04-25',description:''},
    { task_code:'BM1000-0001',task_name:'專案負責',labor_hour:'2020-04-14~2020-04-15',re_data:'2020-04-28',com_date:'2020-04-28',description:''}
]

//機台
export interface PeriodicElement1 {
    project: string;
    date_for_estimated_start: string;
    date_for_estimated_completion: string;
    date_for_actual_completion: string;
    principal: string;
    file: boolean;
    remark: string;
  }
  
  const ELEMENT_DATA_1: PeriodicElement1[] = [
    { project: '機台產銷會議', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '機台內部訂單', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '機台-BOM[光學]', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '機台-BOM[機械]', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '機台-發包圖面[機械]', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '機台-BOM[電控]', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '機台發包[請購]', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '機台發包[採購]', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '機台組裝前會議', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '機台入料完成(含選配)', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '光學校正完成', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '軟體(Vision)完成', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '軟體(Motion)完成', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '機台組立完成', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '機台試機完成', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '機台入庫(含選配)', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '機台出機', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '機台裝機', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
    { project: '正式BOM產出', date_for_estimated_start: '', date_for_estimated_completion: '', date_for_actual_completion: '', principal: '', file: false, remark: '' },
  ];
  