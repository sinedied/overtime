import { Component } from '@angular/core';
import marked from 'marked';
import dayjs from 'dayjs';

class TimedSection {
  title: string = '';
  duration: number = 0;
  notes?: string = '';
  sections?: TimedSection[] = [];
}

class Presentation extends TimedSection {}

const durationRegex = /(.*?)\s*\(([0-9hms]+)\)$/;

function parseSection(text: string): TimedSection {
  const match = durationRegex.exec(text);
  if (match) {
    const title = match[1] || '';
    const durationString = match[2] ? 'PT' + match[2].toUpperCase() : '';
    const duration = dayjs.duration(durationString).asMilliseconds();
    return { title, duration };
  }
  return { title: text, duration: 0 };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  started = false;
  startDate = null;
  currentTime = 0;

  presentation: Presentation = new Presentation();

  startOrPause() {}
  reset() {}


  constructor() {

  }

  update(event) {
    const md = event.target.value;
    console.log(event.target.value)


    const renderer = new marked.Renderer();
    renderer.heading = (text, level) => {
      if (level === 1 && !this.presentation.title) {
        const section = parseSection(text);
        this.presentation = { ...this.presentation, ...section };
      } else {
        // TODO reconstruct hierarchy
        const section = parseSection(text);
        this.presentation.sections.push(section);
      }
      return '';
    };
    // strips all HTML from markdown
    renderer.html = () => '';

    const notes = marked(md, { renderer });
    this.presentation.notes = notes;
    console.log(this.presentation);
    console.log(notes);
  }

}
