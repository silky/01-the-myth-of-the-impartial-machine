const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const accuracy = 0.666;
const PCTFORMAT = d3.format(".0%");

class RecidivismTable extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
          totalSampleSize: 100,
          totalNoReoffense_a: 70,
          totalReoffense_a: 30,
          totalHighRisk_a: 30,
          highRiskNoReoffense_a: 10,
          highRiskReoffense_a: 20,

          totalNoReoffense_b: 40,
          totalReoffense_b: 60,
          totalHighRisk_b: 60,
          highRiskNoReoffense_b: 20,
          highRiskReoffense_b: 40
        }
    }

    onChange(e) {
      const newValue = +e.target.value;
      // do some error handling here

      this.setState({
        totalHighRisk_a: newValue,
        highRiskReoffense_a: Math.round(accuracy * newValue),
        highRiskNoReoffense_a: Math.round((1 - accuracy) * newValue),
      })
    }

    render() {
        const { hasError, idyll, updateProps, ...props } = this.props;
        const { totalSampleSize, totalNoReoffense_a, totalReoffense_a, totalHighRisk_a, highRiskNoReoffense_a, highRiskReoffense_a, totalNoReoffense_b, totalReoffense_b, totalHighRisk_b, highRiskNoReoffense_b, highRiskReoffense_b } = this.state;
        return (
          <div className="recidivism-tables">
            <div className = "recidivism-table groupA">
              <div>Model Prediction</div>
              <table>
                <thead>
                  <tr>
                    <td></td>
                    <td>Low Risk</td>
                    <td>High Risk</td>
                    <td>Total</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Doesn't Reoffend</td>
                    <td>{totalNoReoffense_a - highRiskNoReoffense_a}</td>
                    <td>{highRiskNoReoffense_a}</td>
                    <td>{totalNoReoffense_a}</td>
                  </tr>
                  <tr>
                    <td>Reoffends</td>
                    <td>{totalReoffense_a - highRiskReoffense_a}</td>
                    <td>{highRiskReoffense_a}</td>
                    <td>{totalReoffense_a}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>{totalSampleSize - totalHighRisk_a}</td>
                    <td><input type="text" autoComplete="off" value={totalHighRisk_a} onChange={this.onChange} /> </td>
                    <td>{totalSampleSize}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className = "recidivism-table groupB">
              <div>Model Prediction</div>
              <table>
                <thead>
                  <tr>
                    <td></td>
                    <td>Low Risk</td>
                    <td>High Risk</td>
                    <td>Total</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Doesn't Reoffend</td>
                    <td>{totalNoReoffense_b - highRiskNoReoffense_b}</td>
                    <td>{highRiskNoReoffense_b}</td>
                    <td>{totalNoReoffense_b}</td>
                  </tr>
                  <tr>
                    <td>Reoffends</td>
                    <td>{totalReoffense_b - highRiskReoffense_b}</td>
                    <td>{highRiskReoffense_b}</td>
                    <td>{totalReoffense_b}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>{totalSampleSize - totalHighRisk_b}</td>
                    <td>{totalHighRisk_b}</td>
                    <td>{totalSampleSize}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className = "recidivism-table accuracyMetrics">
              <table>
                <thead>
                  <tr>
                    <td></td>
                    <td>Group A</td>
                    <td>Group B</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Accuracy:</td>
                    <td>{PCTFORMAT(highRiskReoffense_a/totalHighRisk_a)}</td>
                    <td>{PCTFORMAT(highRiskReoffense_b/totalHighRisk_b)}</td>
                  </tr>
                  <tr>
                    <td>False Positive Rate:</td>
                    <td>{PCTFORMAT(highRiskNoReoffense_a/totalNoReoffense_a)}</td>
                    <td>{PCTFORMAT(highRiskNoReoffense_b/totalNoReoffense_b)}</td>
                  </tr>
                  <tr>
                    <td>False Negative Rate:</td>
                    <td>{PCTFORMAT((totalReoffense_a - highRiskReoffense_a)/totalReoffense_a)}</td>
                    <td>{PCTFORMAT((totalReoffense_b - highRiskReoffense_b)/totalReoffense_b)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
    }
}

module.exports = RecidivismTable;