/* Example usage:

async function example() {
    await new WaitUntil(() => condition).wait(); // Wait until condition is true
    // Do something when the condition is met
}

*/

class WaitUntil
{
    constructor(conditionFunction)
    {
        this.condition = conditionFunction;  // Condition function that should return a boolean
    }
  
    // Method that returns a Promise
    wait()
    {
        return new Promise(resolve =>
        {
            // Check the condition every 100ms
            const intervalId = setInterval(() =>
            {
                if (this.condition())
                {
                    clearInterval(intervalId);  // Stop checking when the condition is true
                    resolve();                    // Resolve the Promise when the condition is met
                }
            }, 100); // Check every 100ms
        });
    }
}