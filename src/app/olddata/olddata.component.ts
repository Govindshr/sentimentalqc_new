import { Component } from '@angular/core';
import { ApicallService } from '../apicall.service';

@Component({
  selector: 'app-olddata',
  templateUrl: './olddata.component.html',
  styleUrls: ['./olddata.component.css']
})
export class OlddataComponent {
  constructor(private apiService: ApicallService) {}

  savedCategories: { category: string, sentiment: string }[] = [];
  selectedCategories: string[] = [];
  selectedSentiments: string[] = [];
  blankArray: any = [];
  modaltitle: any = '';
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
    limit: 30,
    offset: 1,
  };

  result_id_Array: any = [];
  new_Result: any = [];
  newData: any = [];
  check: any = [];
  openAccordion: any = [];

  category_List: string[] = ['Availability', 'Competence', 'Behavioural Attributes', 'Pricing', 'Quality', 'Communication', 'Commitment', 'Documentation', 'Quotation', 'Suggestion', 'Others'];

  ngOnInit() {
    this.allData();
    this.selectedCategories = new Array(this.categoryarray.length).fill('');
    this.selectedSentiments = new Array(this.categoryarray.length).fill('');
    this.initializeSelectedCategories();
  }

  doneResult(event: any) {
    event.is_checked = 1;

    if(event.category_qc && event.category_qc.length == 0) {
      delete event.category_qc;
    }
    if (this.savedCategories ){
      let data = JSON.stringify(this.savedCategories)
      console.log(data)
     event.category_reason=JSON.parse(data)
     event.category_qc=this.categoryarray
    }
    console.log(event,"res")

    // this.apiService.updateOldData(event).subscribe(data => {
    //   this.check = data;
    //   event.updated = true;
      
    //   this.showToast = true;
    //   setTimeout(() => { this.showToast = false; }, 2000);
    // });
  }

  reload() {
    window.location.reload();
  }

  loadmore() {
    this.page.offset = this.page.offset - 1;
    this.allData();
  }

  loadmore1() {
    this.page.offset = this.page.offset + 1;
    this.allData();
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

  saveChanges(): void {
    this.savedCategories = this.categoryarray.map((category: any, index: any) => ({
      Category: category,
      Category_text: this.selectedCategories[index],
      Sentiment: this.selectedSentiments[index]
    }));
        let data = JSON.stringify(this.savedCategories)
    console.log(data);
    console.log(this.categoryarray)
  }

  delete(index: any) {
    this.categoryarray.splice(index, 1);
    this.selectedCategories.splice(index, 1);
    this.selectedSentiments.splice(index, 1);
  }

  openCategoryModal(data: any, question: any) {
    this.modaltitle = question;
    this.categoryarray = data.split(',').map((data: any) => data.trim());
  }

  addRow(): void {
    this.categoryarray.push('');
    this.selectedCategories.push('');
    this.selectedSentiments.push('');
  }

  initializeSelectedCategories(): void {
    this.selectedCategories = this.categoryarray.map((category: any) => category);
  }

  allData() {
    this.new_Result = [];
    this.newData = [];
    let object = {
      "page_size": this.page.limit,
      "current_page": this.page.offset
    };

    this.loader = true;

    this.apiService.getOldData(object).subscribe((data: any) => {
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
}
