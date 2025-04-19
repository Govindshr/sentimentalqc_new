import { NgFor } from '@angular/common';
import { ApicallService } from '../apicall.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  constructor(private apiService: ApicallService) {}

  savedCategories: { category: string, sentiment: string }[] = [];
  selectedCategories: string[] = [];
  selectedSentiments: string[] = [];
  blankArray: any = [];
  modaltitle: any = '';
  text:any=''
   response:any=''
  categoryarray: any = [];
  qcsentiment: any;
  qccategory: any;
  api_Data: any = [];
  loader: any = false;
  massage: any;
  error: any;
  SurveyInstanceID: any = '';
  showToast: any = false;
  page = {
    limit: 15,
    offset: 1,
    total_pages:0
  };
  pageRange:any
  result_id_Array: any = [];
  new_Result: any = [];
  activetab :any=""
  newData: any = [];
  check: any = [];
  // apisuccess:any
  openAccordion: any = [];

  category_List: string[] = ['Availability', 'Competence', 'Behavioural Attributes','Pricing','Communication', 'Commitment', 'Documentation', 'Quotation','Suggestion','Future Involvement','Followup','Brand Perception','Lead time','Service Quality','Product Quality', 'General'];

  ngOnInit() {
    
    this.selectedCategories = new Array(this.categoryarray.length).fill('');
    this.selectedSentiments = new Array(this.categoryarray.length).fill('');
    this.initializeSelectedCategories();
  }

  allData(type:any) {
    if (type=="main"){
      this.page.offset=1
      this.SurveyInstanceID=''
      this.page.total_pages=0
      
    }
     this.activetab="present"
    this.new_Result = [];
    this.newData = [];
    let object = {
      "page_size": this.page.limit,
      "current_page": this.page.offset
    };

    this.loader = true;

    this.apiService.getData(object).subscribe((data: any) => {
      this.loader = false;
      this.api_Data = data;
      this.newData = data;
      this.page.total_pages = data.total_pages
      this.updatePageRange();

      if (this.newData.status_code == 200 && this.newData.length <= 0) {
        this.massage = "No Data Available";
      }

      this.api_Data.data.forEach((element: any) => {
        let flag = true;

        this.new_Result.forEach((n: any) => {
          if (n.SurveyInstanceID == element.SurveyInstanceID) {
            flag = false;
          }
        });

        if (flag) {
          this.new_Result.push({ SurveyInstanceID: element.SurveyInstanceID });
        }
      });

      // Initialize conflict to 0 if not already set
      this.api_Data.data.forEach((element: any) => {
        if (element.conflict === undefined || element.conflict === null) {
          element.conflict = 0;
        }
      });
    }, error => {
      this.loader = false;
      this.error = error.message;
    });
  }
 
  toastMessage: string = '';

showToastMessage(): void {
  const toastEl = document.getElementById('errorToast');
  if (toastEl) {
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
}

  allHistoricalData(type:any) {
    if (type=="main"){
      this.page.offset=1
      this.SurveyInstanceID=''
      this.page.total_pages=0
      
    }
    this.activetab="history"
    this.new_Result = [];
    this.newData = [];
 
    let object = {
      "page_size": this.page.limit,
      "current_page": this.page.offset
    };

    this.loader = true;

    this.apiService.getHistoricalData(object).subscribe((data: any) => {
      this.loader = false;
      this.api_Data = data;
      this.newData = data;
      this.page.total_pages = data.total_pages
      this.updatePageRange();
      if (this.newData.status_code == 200 && this.newData.length <= 0) {
        this.massage = "No Data Available";
      }

      this.api_Data.data.forEach((element: any) => {
        let flag = true;

        this.new_Result.forEach((n: any) => {
          if (n.SurveyInstanceID == element.SurveyInstanceID) {
            flag = false;
          }
        });

        if (flag) {
          this.new_Result.push({ SurveyInstanceID: element.SurveyInstanceID });
        }
      });

      // Initialize conflict to 0 if not already set
      this.api_Data.data.forEach((element: any) => {
        if (element.conflict === undefined || element.conflict === null) {
          element.conflict = 0;
        }
      });
    }, error => {
      this.loader = false;
      this.error = error.message;
    });
  }
 
  doneResult(event: any, cwt: any) {
    if (cwt === 'done') {
      event.cwt = 'no';
    } else if (cwt === 'cwt') {
      event.cwt = 'yes';
    }
  
    event.is_checked = 1;
  
    if (event.conflict) {
      event.conflict = Number(event.conflict);
    }
  
    if (!event.category_reason) {
      event.category_reason = [];
    }
  
    const categoriesArray = event.category_reason.map((obj: any) => obj.Category);
    event.category_qc = categoriesArray ? categoriesArray : [];
  
    this.apiService.updateData(event).subscribe({
      next: (data: any) => {
        this.check = data;
  
        if (this.check.status_code === 200) {
          event.updated = true;
          event.showCWT = false;
        } else if (this.check.status_code === 500) {
          event.showCWT = true;
          this.toastMessage = this.check.message || 'Internal Server Error';
          this.showToastMessage();
        }
  
        this.showToast = true;
        setTimeout(() => { this.showToast = false; }, 2000);
      },
      error: (err) => {
        event.showCWT = true;
        this.toastMessage = err.error?.message || 'Internal Server Error';
        this.showToastMessage();
      }
    });
  
    this.clearModalFields();
  }
  
  doneResultForHistory(event: any, cwt: any) {
    if (cwt === 'done') {
      event.cwt = 'no';
    } else if (cwt === 'cwt') {
      event.cwt = 'yes';
    }
  
    event.is_checked = 1;
  
    if (event.conflict) {
      event.conflict = Number(event.conflict);
    }
  
    if (!event.category_reason) {
      event.category_reason = [];
    }
  
    const categoriesArray = event.category_reason.map((obj: any) => obj.Category);
    event.category_qc = categoriesArray ? categoriesArray : [];
  
    this.apiService.updateHistoricalData(event).subscribe({
      next: (data: any) => {
        this.check = data;
  
        if (this.check.status_code === 200) {
          event.updated = true;
          event.showCWT = false;
        } else if (this.check.status_code === 500) {
          event.showCWT = true;
          this.toastMessage = this.check.message || 'Internal Server Error';
          this.showToastMessage();
        }
  
        this.showToast = true;
        setTimeout(() => { this.showToast = false; }, 2000);
      },
      error: (err) => {
        event.showCWT = true;
        this.toastMessage = err.error?.message || 'Internal Server Error';
        this.showToastMessage();
      }
    });
  
    this.clearModalFields();
  }
  
  

  reload() {
    window.location.reload();
  }

  loadmore(activetab:any) {
    // this.page.offset = this.page.offset - 1;
    // this.allData();
    if(activetab=="present"){
    if (this.page.offset > 1) {
      this.page.offset--;
      this.allData("other");
    }}
    else if(activetab=="history"){
      if (this.page.offset > 1) {
        this.page.offset--;
        this.allHistoricalData('other');
      }}
  }

  loadmore1(activetab:any) {
    if(activetab=="present"){
    // this.page.offset = this.page.offset + 1;
    // this.allData();
    if (this.page.offset < this.page.total_pages) {
      this.page.offset++;
      this.allData("other");
    }
  }
  else if(activetab=="history"){
    // this.page.offset = this.page.offset + 1;
    // this.allData();
    if (this.page.offset < this.page.total_pages) {
      this.page.offset++;
      this.allHistoricalData('other');
    }
  }
  }

  filterdata() {
    this.new_Result = [];
    this.newData = [];
    let object = {
      "SurveyInstanceID": Number(this.SurveyInstanceID),
    };

    this.loader = true;

    this.apiService.getfilteredData(object).subscribe((data: any) => {
      this.loader = false;
      this.api_Data = data;
      this.newData = data;

      if (this.newData.status_code == 200 && this.newData.length <= 0) {
        this.massage = "No Data Available";
      }

      this.api_Data.data.forEach((element: any) => {
        let flag = true;

        this.new_Result.forEach((n: any) => {
          if (n.SurveyInstanceID == element.SurveyInstanceID) {
            flag = false;
          }
        });

        if (flag) {
          this.new_Result.push({ SurveyInstanceID: element.SurveyInstanceID });
        }
      });
    }, error => {
      this.loader = false;
      this.error = error.message;
    });
  }
  filterHistoricalData() {
    this.new_Result = [];
    this.newData = [];
    let object = {
      "SurveyInstanceID": Number(this.SurveyInstanceID),
    };

    this.loader = true;

    this.apiService.getfilteredHistoricalData(object).subscribe((data: any) => {
      this.loader = false;
      this.api_Data = data;
      this.newData = data;

      if (this.newData.status_code == 200 && this.newData.length <= 0) {
        this.massage = "No Data Available";
      }

      this.api_Data.data.forEach((element: any) => {
        let flag = true;

        this.new_Result.forEach((n: any) => {
          if (n.SurveyInstanceID == element.SurveyInstanceID) {
            flag = false;
          }
        });

        if (flag) {
          this.new_Result.push({ SurveyInstanceID: element.SurveyInstanceID });
        }
      });
    }, error => {
      this.loader = false;
      this.error = error.message;
    });
  }

  saveChanges(): void {
   
   this.currentRow.category_reason = this.currentRow?.category_reason.map((category: any, index: any) => ({
      Category: category ? category :"",
      Category_text: this.selectedCategories[index] ? this.selectedCategories[index] : "",
      Sentiment: this.selectedSentiments[index] ? this.selectedSentiments[index] :""
    }));
    
    // console.log("data",this.currentRow.category_reason)
    this.currentRow.categoryArray = [...this.categoryarray];
    this.currentRow.category_qc = [...this.categoryarray];
    
    var myModalEl = document.getElementById('exampleModal');
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  }
  addNewRow() {
    this.currentRow.push({ Category: '', Category_text: '', Sentiment: '' });
  }

  delete(index: any) {
    this.currentRow.splice(index, 1);
  }

  openCategoryModal(row: any, question: any, text: any, response: any) {
    console.log("row", row);
    this.modaltitle = question;
    this.text = text;
    this.response = response;

  
    if (row.category_reason && row.category_reason.length > 0) {
        this.currentRow = row.category_reason;
    } else {
        row.category_reason = row.category ? 
            row.category.split(',').map((data: any) => { 
                return {Category: data.trim(), Category_text: "", Sentiment: ""}; 
            }) : [];
        this.currentRow = row.category_reason;
    }

   
    if (this.categoryarray.length <= 0) {
        this.categoryarray = row.category ? 
            row.category.split(',').map((data: any) => data.trim()) : [];
    }
}


  getCategoryQc(categories:any){
    if(categories && categories.length){
  let a = categories.reduce((p:any,q:any)=>{return `${p}${q.Category},`},"")
  
  return a
    }else{
      return null
    }
  }

 

  initializeSelectedCategories(): void {
    this.selectedCategories = this.categoryarray.map((category: any) => category);
  }

  clearModalFields() {
    this.categoryarray = [];
    this.selectedCategories = [];
    this.selectedSentiments = [];
  }

  categoryItem(newValue: any, resp: any) {
    if (!resp.category_qc) {
      resp.category_qc = [];
    }

    let flag = resp.category_qc.includes(newValue);

    if (flag) {
      let index = resp.category_qc.indexOf(newValue);
      resp.category_qc.splice(index, 1);
    } else {
      resp.category_qc.push(newValue);
    }
  }
  updatePageRange() {
    
    const startPage = ((Math.ceil(this.page.offset / 5) - 1) * 5) + 1;
    // console.log(startPage)
    this.pageRange = Array.from({ length: Math.min(5, this.page.total_pages - startPage + 1) }, (_, i) => startPage + i);
  // console.log("page range ",this.pageRange)
  }

  nextPage() {
    for(let i =1 ; i<=5 ; i++){
    if (this.page.offset + i <= this.page.total_pages) {
      this.page.offset += 1;
    }}
    this.updatePageRange();
  }

  prevPage() {
    if (this.page.offset - 5 >= 1) {
      this.page.offset -= 5;
      this.updatePageRange();
    }
   
  }

  goToPage(page: number,activetab:any) {
  
    if(activetab=="present"){
     
      this.page.offset = page;
      this.updatePageRange();
        this.allData("other");
      }
      else if(activetab=="history"){
        this.page.offset = page;
    this.updatePageRange();
          this.allHistoricalData('other');
        }
  }
  currentRow: any
}
