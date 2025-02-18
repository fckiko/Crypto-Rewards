import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

class CryptoEpochRewards {
  calculateRewardPeso(
    stakedAmountPeso: number,
    stakeDuration: { start: Date; finish: Date },
    annualRewardRate: number,
    marketCapAmount: number,
    profitShareAmount: number
  ): number {
    if (stakedAmountPeso <= 0 || annualRewardRate <= 0 || marketCapAmount <= 0 || profitShareAmount <= 0) {
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
    const adjustedRewardRate = annualRewardRate * profitShareFactor;
    const dailyRewardRate = adjustedRewardRate / 365;

    const rewardAmountPeso = stakedAmountPeso * dailyRewardRate * stakeDurationDays;

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
      background-color: #fff;
      border-radius: 12px;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
      padding: 40px;
      text-align: center;
    }

    .card-title {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 2.1rem;
        font-weight: bold; 

    }

    .result-card {
      background-color: #8f48d2;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 25px;
      border: 1px solid #cce5ff;
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
      color: #333;
      font-weight: 600;
    }

    .form-control {
      width: 100%;
      padding: 12px;
      border: 1px solid #ced4da;
      border-radius: 6px;
      font-size: 1rem;
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
export class App implements OnInit {
  private calculator = new CryptoEpochRewards();

  stakedAmount: number = 10000;
  startDate: string = new Date().toISOString().split('T')[0];
  endDate: string = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  annualRewardRate: number = 10.5; // Default 5% annual rate
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
      this.annualRewardRate,
      this.marketCap,
      this.profitShare
    );
  }

  formatReward(reward: number): string {
    return reward.toFixed(2);
  }
}

bootstrapApplication(App);