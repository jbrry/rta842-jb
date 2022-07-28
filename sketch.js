let graph;  
let graph2;

let average;

//-----------------------------------------------------------------
// This runs once in the beginning 
function setup() {
  createCanvas(windowWidth, windowHeight);   
  // put init code here
  graph = new Graph(width/2-350, height/2-150, 300, 300);  
  graph2 = new Graph(width/2+50, height/2-150, 300, 300);
  
  average = new Average(20);
}

//-----------------------------------------------------------------
// Runs when the window is resized 
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//-----------------------------------------------------------------
// Our main program loop 
function draw() {
  background('black');
  stroke('white');

  graph.add(mouseX);
  graph.draw();
  
  graph2.add(average.process(mouseX));
  graph2.draw();

}

//-----------------------------------------------------------------
class Graph {
  constructor(x, y, w, h, maxValues=60) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.min = 999999999;
    this.max = -999999999;
    
    this.values = [];
    this.maxValues = maxValues;
  }
  
  // insert functions below
  draw() {
    push();
    noFill();
    translate(this.x, this.y);
    rect(0, 0, this.w, this.h);
    
    for (let i=0; i < this.values.length; i++) {
      let x = map(i, 0, this.values.length-1, 0, this.w);
      let y = map(this.values[i], this.min, this.max, this.h, 0);
      
      line(x, y, x, this.h);
    }
    
    pop(); 
  }
  
  add(newValue) {
    // record some data
    this.values.push(newValue);
    if (this.values.length > this.maxValues) {
      this.values.splice(0, 1);
    }
    
    if (newValue < this.min) this.min = newValue;
    if (newValue > this.max) this.max = newValue;
  
  }
}


//-----------------------------------------------------------------
class Average { 
  
  constructor(n) { // n -> number of samples to average
    this.n = n; 
    this.values = []; 
  } 

  // add a new value to the running average
  // and return the current average value 
  process(newValue) {
    
    this.values.push(newValue);
    if (this.values.length > this.n) {
      this.values.splice(0, 1); 
    }
    
    let sum = 0;
    for (let i=0; i < this.values.length; i++) {
      sum += this.values[i];   
    }
    
    let avg = sum / this.values.length; 
    return avg; 
  }
  
}
