import { Component, OnInit, Inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { KafkaService } from '@app/services/kafka/kafka.service';
import { KafkaContent, ContentEntity } from '@app/models/kafka-content.model';

export interface KafkaModalData {
  content: ContentEntity;
}

@Component({
  selector: 'app-kafka',
  templateUrl: './kafka.component.html',
  styleUrls: ['./kafka.component.scss']
})
export class KafkaComponent implements OnInit {

  isLoading: boolean;
  showFiller = false;
  topics: String[] = [];
  content: ContentEntity[];
  selectedTopic: String;
  totalContent: ContentEntity[];

  constructor(private kafkaService: KafkaService, public dialog: MatDialog) { }

  ngOnInit() {
    this.kafkaService.getTopics({})
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response: any) => { this.topics = response; });

  }

  filterChanged($event: any) {
    const value = $event.target.value as string;
    this.content = this.totalContent.filter(message => message.value.toLowerCase().includes(value.toLowerCase()));
  }

  selectContent(message: ContentEntity) {
    const dialogRef = this.dialog.open(KafkaModalComponent, { width: '500px', data: { content: message } });
    dialogRef.afterClosed().subscribe(result => { console.log('The dialog was closed'); });
  }

  updateTopicContent(topic: string) {
    this.selectedTopic = topic;

    this.kafkaService.getContent({})
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response: KafkaContent) => {
        // this.totalContent = response.content;
        this.totalContent = JSON.parse(JSON.stringify(require('./testData/content.json'))) as ContentEntity[];
        this.shuffleArray(this.totalContent);
        this.content = this.totalContent;
      });
  }

  shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

@Component({
  selector: 'app-kafka-modal',
  templateUrl: 'kafka-modal.component.html',
})
export class KafkaModalComponent {
  constructor(
    public dialogRef: MatDialogRef<KafkaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: KafkaModalData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
