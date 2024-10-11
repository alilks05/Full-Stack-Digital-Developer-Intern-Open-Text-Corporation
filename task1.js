// Task 1: Display a triangle of 3x4
function triangle3x4() {
    for (let i = 1; i <= 3; i++) {
      console.log('*'.repeat(i));
    }
  }
  
  // Task 1 Bonus: Generalized function for any MxN triangle
  function triangleMxN(m, n) {
    for (let i = 1; i <= m; i++) {
      console.log('*'.repeat(Math.min(i, n)));
    }
  }
  
  // Display 3x4 triangle
  triangle3x4();
  
  // Example: Display a triangle with any M x N dimensions
  triangleMxN(5, 7); // Outputs a triangle of 5 rows and a max width of 7
  