import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

class CryptoEpochRewards {
  calculateRewardPeso(
    stakedAmountPeso: number,
    stakeDuration: { start: Date; finish: Date },
    monthlyRewardRate: number,
    marketCapAmount: number,
    profitShareAmount: number
  ): number {
    if (stakedAmountPeso <= 0 || monthlyRewardRate <= 0 || marketCapAmount <= 0 || profitShareAmount <= 0) {
      return 0;
    }

    const stakeStartTime = stakeDuration.start.getTime();
    const stakeFinishTime = stakeDuration.finish.getTime();

    if (stakeStartTime >= stakeFinishTime) {
      return 0;
    }

    const stakeDurationDays = (stakeFinishTime - stakeStartTime) / (1000 * 60 * 60 * 24);
    if (stakeDurationDays <= 0) {
      return 0;
    }

    const profitShareFactor = profitShareAmount / marketCapAmount;
    const adjustedRewardRate = (monthlyRewardRate / 100) * profitShareFactor; // Convert percentage to decimal

    const rewardAmountPeso = (stakedAmountPeso * adjustedRewardRate * stakeDurationDays) / 30;

    return rewardAmountPeso;
  }
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <div class="card">
        <h1 class="card-title">Crypto Rewards Calculator (PHP)</h1>

        <div class="result-card">
          <p>Calculated Reward:</p>
          <h2 class="reward-amount">{{ formatReward(calculatedReward) }} PHP</h2>
        </div>

        <div class="input-grid">
          <div class="form-group">
            <label for="stakedAmount">Staked Amount (PHP)</label>
            <input
              type="number"
              id="stakedAmount"
              [(ngModel)]="stakedAmount"
              (ngModelChange)="calculateReward()"
              placeholder="Enter amount"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label for="profitShare">Profit Share (PHP)</label>
            <input
              type="number"
              id="profitShare"
              [(ngModel)]="profitShare"
              (ngModelChange)="calculateReward()"
              placeholder="Enter amount"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label for="marketCap">Market Cap (PHP)</label>
            <input
              type="number"
              id="marketCap"
              [(ngModel)]="marketCap"
              (ngModelChange)="calculateReward()"
              placeholder="Enter amount"
              class="form-control"
            >
          </div>

          
          <div class="form-group">
            <label for="monthlyRewardRate">Epoch/Monthly Reward Rate (%):</label>
            <input
              type="number"
              id="monthlyRewardRate"
              [(ngModel)]="monthlyRewardRate"
              (ngModelChange)="calculateReward()"
              class="form-control"
              placeholder="Enter monthly rate e.g., 1 for 1%"
              step="0.01">
          </div>
        </div>
        <div class="input-grid">
          <div class="form-group">
            <label for="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              [(ngModel)]="startDate"
              (ngModelChange)="calculateReward()"
              class="form-control date-input"
            >
          </div>

          <div class="form-group">
            <label for="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              [(ngModel)]="endDate"
              (ngModelChange)="calculateReward()"
              class="form-control date-input"
            >
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Apply font globally for consistency */
    :host {
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background-color: #f0f2f5;
      font-family: 'Helvetica Neue', Arial, sans-serif; 
      color: #333;
      line-height: 1.6;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      width: 100%;
      max-width: 600px;
    }

    .card {
      background-color: #1D1D1B;
      border-radius: 12px;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      padding: 40px;
      text-align: center;
    }

    .card-title {
      color: #f1f1f1;
      margin-bottom: 20px;
      font-size: 2.1rem;
        font-weight: bold; 

    }

    .result-card {
      background-color: #4158D0; background-image: linear-gradient(217deg, #4158D0 0%, #C850C0 46%, #1c0511 100%);
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 25px;
    }

    .result-card p {
      color: #f1f1f1;
      margin-bottom: 5px;
      font-size: 0.9em;
    }

    .reward-amount {
      color: #f1f1f1;
      font-size: 2rem;
      font-weight: 600;
      margin: 0;
    }

    .input-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 16px;
      text-align: left;
    }

    .form-group {
      margin-bottom: 0;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #f1f1f1;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 12px;
      border: 1px solid #ced4da;
      border-radius: 6px;
      font-size: 1rem;
      background-color: #D9D3C1;
      transition: border-color 0.2s ease-in-out;
    }

    .form-control:focus {
      outline: none;
      border-color: #80bdff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    ::placeholder {
      color: #999;
    }

    /* Hide arrows for number inputs */
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type=number] {
      -moz-appearance: textfield;
    }

    .date-input {
      position: relative;
    }

    .date-input::-webkit-calendar-picker-indicator {
      background: transparent;
      bottom: 0;
      color: #8f48d2; 
      cursor: pointer;
      height: auto;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: auto;
    }

    .date-input::-moz-date-button {
       color: #8f48d2;
    }
  `]
})
export class App {
  private calculator = new CryptoEpochRewards();

  stakedAmount: number = 10000;
  startDate: string = new Date().toISOString().split('T')[0];
  endDate: string = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  monthlyRewardRate: number = 10.5;
  profitShare: number = 101591068;
  marketCap: number = 3753480698;
  calculatedReward: number = 0;

  ngOnInit() {
    this.calculateReward();
  }

  calculateReward() {
    this.calculatedReward = this.calculator.calculateRewardPeso(
      this.stakedAmount,
      {
        start: new Date(this.startDate),
        finish: new Date(this.endDate)
      },
      this.monthlyRewardRate,
      this.marketCap,
      this.profitShare
    );
  }

  formatReward(reward: number): string {
    return reward.toFixed(2);
  }
}

bootstrapApplication(App);