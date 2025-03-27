//
// Server cost functions
// Values taken from https://strategywiki.org/wiki/MapleStory/Spell_Trace_and_Star_Force#Meso_Cost
//
function makeMesoFn(divisor, currentStarExp = 2.7, extraMult = 1) {
  return (currentStar, itemLevel) => 100 * Math.round(extraMult * itemLevel ** 3 * ((currentStar + 1) ** currentStarExp) / divisor + 10);
}

function preSaviorMesoFn(current_star) {
  if (current_star >= 15) {
    return makeMesoFn(20000);
  }
  if (current_star >= 10) {
    return makeMesoFn(40000)
  }
  return makeMesoFn(2500, 1);
}

function preSaviorCost(current_star, item_level) {
  const mesoFn = preSaviorMesoFn(current_star);
  return mesoFn(current_star, item_level);
}

function saviorMesoFn(current_star) {
  switch (current_star) {
  case 11:
    return makeMesoFn(22000);
  case 12:
    return makeMesoFn(15000);
  case 13:
    return makeMesoFn(11000);
  case 14:
    return makeMesoFn(7500);
  default:
    return preSaviorMesoFn(current_star);
  }
}

function kmsMesoFn(current_star) {
  switch (current_star) {
  case 11:
    return makeMesoFn(22000);
  case 12:
    return makeMesoFn(15000);
  case 13:
    return makeMesoFn(11000);
  case 14:
    return makeMesoFn(7500);
  case 17:
    return makeMesoFn(20000, 2.7, 4/3);
  case 18:
    return makeMesoFn(20000, 2.7, 20/7);
  case 19:
    return makeMesoFn(20000, 2.7, 40/9);
  case 21:
    return makeMesoFn(20000, 2.7, 8/5);
  default:
    return preSaviorMesoFn(current_star);
  }
}

function saviorCost(current_star, item_level) {
  const mesoFn = saviorMesoFn(current_star);
  return mesoFn(current_star, item_level);
}

function kmsCost(current_star, item_level) {
  const mesoFn = kmsMesoFn(current_star);
  return mesoFn(current_star, item_level);
}

function tmsRegMesoFn(current_star) {
  if (current_star >= 20) {
    return makeMesoFn(4000);
  }
  if (current_star >= 15) {
    return makeMesoFn(5000);
  }
  if (current_star >= 11) {
    return makeMesoFn(20000, 2.7, 3);
  }
  if (current_star >= 10) {
    return makeMesoFn(20000);
  }
  return makeMesoFn(2500, 1);
}

function tmsRegCost(current_star, item_level) {
  const mesoFn = tmsRegMesoFn(current_star);
  return mesoFn(current_star, item_level);
}

function tmsRebootCost(current_star, item_level) {
  const adjusted_level = item_level > 150 ? 150 : item_level;
  return saviorCost(current_star, adjusted_level);
}

// Map from server input value to the associated cost function.
// As of the ignition update GMS uses KMS starforce prices.
// The Savior update increases cost for 11-15 but removes downgrading/booming.
const SERVER_COST_FUNCTIONS = {
  "gms": saviorCost,
  // Leaving this in for players who want to compare.
  "old": preSaviorCost,
  "tms": tmsRegCost,
  "tmsr": tmsRebootCost,
  'kms': kmsCost
}

function getBaseCost(server, current_star, item_level) {
  const costFn = SERVER_COST_FUNCTIONS[server];
  return costFn(current_star, item_level, server);
}

// { currentStar: [success, maintain, decrease, boom] }
const preSaviorRates = {
  0: [0.95, 0.05, 0, 0],
  1: [0.9, 0.1, 0, 0],
  2: [0.85, 0.15, 0, 0],
  3: [0.85, 0.15, 0, 0],
  4: [0.80, 0.2, 0, 0],
  5: [0.75, 0.25, 0, 0],
  6: [0.7, 0.3, 0, 0],
  7: [0.65, 0.35, 0, 0],
  8: [0.6, 0.4, 0, 0],
  9: [0.55, 0.45, 0, 0],
  10: [0.5, 0.5, 0, 0],
  11: [0.45, 0, 0.55, 0],
  12: [0.4, 0.0, 0.594, 0.006],
  13: [0.35, 0.0, 0.637, 0.013],
  14: [0.3, 0.0, 0.686, 0.014],
  15: [0.3, 0.679, 0, 0.021],
  16: [0.3, 0.0, 0.679, 0.021],
  17: [0.3, 0.0, 0.679, 0.021],
  18: [0.3, 0.0, 0.672, 0.028],
  19: [0.3, 0.0, 0.672, 0.028],
  20: [0.3, 0.63, 0, 0.07],
  21: [0.3, 0, 0.63, 0.07],
  22: [0.03, 0.0, 0.776, 0.194],
  23: [0.02, 0.0, 0.686, 0.294],
  24: [0.01, 0.0, 0.594, 0.396]
}

const kmsRates = {
  0: [0.95, 0.05, 0, 0],
  1: [0.9, 0.1, 0, 0],
  2: [0.85, 0.15, 0, 0],
  3: [0.85, 0.15, 0, 0],
  4: [0.80, 0.2, 0, 0],
  5: [0.75, 0.25, 0, 0],
  6: [0.7, 0.3, 0, 0],
  7: [0.65, 0.35, 0, 0],
  8: [0.6, 0.4, 0, 0],
  9: [0.55, 0.45, 0, 0],
  10: [0.5, 0.5, 0, 0],
  11: [0.45, 0.55, 0.0, 0.0],
  12: [0.4, 0.6, 0.0, 0.0],
  13: [0.35, 0.65, 0.0, 0.0],
  14: [0.3, 0.7, 0.0, 0.0],
  15: [0.3, 0.679, 0, 0.021],
  16: [0.3, 0.679, 0, 0.021],
  17: [0.15, 0.782, 0, 0.068],
  18: [0.15, 0.782, 0, 0.068],
  19: [0.15, 0.765, 0, 0.085],
  20: [0.3, 0.595, 0, 0.105],
  21: [0.15, 0.7225, 0, 0.1275],
  22: [0.15, 0.68, 0, 0.17],
  23: [0.10, 0.72, 0, 0.18],
  24: [0.10, 0.72, 0, 0.18],
  25: [0.10, 0.72, 0, 0.18],
  26: [0.07, 0.744, 0, 0.186],
  27: [0.05, 0.76, 0, 0.19],
  28: [0.03, 0.776, 0, 0.194],
  29: [0.01, 0.792, 0, 0.198]
}

const saviorRates = {
  ...preSaviorRates,
  11: [0.45, 0.55, 0.0, 0.0],
  12: [0.4, 0.6, 0.0, 0.0],
  13: [0.35, 0.65, 0.0, 0.0],
  14: [0.3, 0.7, 0.0, 0.0],
}

// Source: https://tw.beanfun.com/beanfuncommon/EventAD_Mobile/EventAD.aspx?EventADID=8388
// Big oof.
const TMSRates = {
  ...saviorRates,
  15: [0.3, 0.595, 0, 0.1],
  16: [0.3, 0.0, 0.56, 0.14],
  17: [0.3, 0.0, 0.49, 0.21],
  18: [0.3, 0.0, 0.42, 0.28],
  19: [0.3, 0.0, 0.42, 0.28],
  20: [0.3, 0.35, 0, 0.35],
  21: [0.3, 0, 0.35, 0.35],
  22: [0.03, 0.0, 0.388, 0.582],
  23: [0.02, 0.0, 0.392, 0.588],
  24: [0.01, 0.0, 0.396, 0.594]
}

const tyrantAEERates = {
  0: [1, 0, 0, 0],
  1: [0.9, 0.1, 0, 0],
  2: [0.8, 0.2, 0, 0],
  3: [0.7, 0.3, 0, 0],
  4: [0.6, 0.4, 0, 0],
  5: [0.5, 0.5, 0, 0],
  6: [0.4, 0.6, 0, 0],
  7: [0.3, 0.7, 0, 0],
  8: [0.2, 0.8, 0, 0],
  9: [0.1, 0.9, 0, 0],
  10: [0.05, 0.95, 0, 0],
  11: [0.04, 0.96, 0, 0],
  12: [0.03, 0.97, 0, 0],
  13: [0.02, 0.98, 0, 0],
  14: [0.01, 0.99, 0, 0],
}

const tyrantRates = {
  0: [0.5, 0.5, 0, 0],
  1: [0.5, 0, 0.5, 0],
  2: [0.45, 0, 0.55, 0],
  3: [0.4, 0, 0.6, 0],
  4: [0.4, 0, 0.6, 0],
  5: [0.4, 0, 0.582, 0.018],
  6: [0.4, 0, 0.57, 0.03],
  7: [0.4, 0, 0.558, 0.042],
  8: [0.4, 0, 0.54, 0.06],
  9:  [0.37, 0, 0.5355, 0.0945],
  10: [0.35, 0, 0.52, 0.13],
  11: [0.35, 0, 0.4875, 0.1625],
  12: [0.03, 0, 0.485, 0.485],
  13: [0.02, 0, 0.49, 0.49],
  14: [0.01, 0, 0.495, 0.495],
}

// Map from server input value to the associated starforcing rates.
const SERVER_RATES = {
  "gms": saviorRates,
  // Leaving this in for players who want to compare.
  "old": preSaviorRates,
  "tms": TMSRates,
  "tmsr": TMSRates,
  "kms": kmsRates
}

export function getRates(server, itemType, useAEE) {
  if (itemType === "tyrant") {
    return useAEE ? tyrantAEERates : tyrantRates;
  }
  return SERVER_RATES[server];
}

function getSafeguardMultiplierIncrease(current_star, sauna, server) {
  if (server === 'kms' && current_star >= 15 && current_star <= 17) {
    return 2;
  }
  if (server === "old" && !sauna && current_star >= 12 && current_star <= 16) {
    return 1;
  }
  if (server !== 'kms' && current_star >= 15 && current_star <= 16) {
    return 1;
  }

  return 0
}

export function percentile(arr, p) {
  if (arr.length === 0) return 0;
  if (typeof p !== 'number') throw new TypeError('p must be a number');
  if (p <= 0) return arr[0];
  if (p >= 1) return arr[arr.length - 1];

  const index = (arr.length - 1) * p,
    lower = Math.floor(index),
    upper = lower + 1,
    weight = index % 1;

  if (upper >= arr.length) return arr[lower];
  return arr[lower] * (1 - weight) + arr[upper] * weight;
}

function median(values) {

  values.sort(function (a, b) {
    return a - b;
  });

  const half = Math.floor(values.length / 2);

  if (values.length % 2)
    return values[half];
  else
    return (values[half - 1] + values[half]) / 2.0;
}

function attemptCost(current_star, item_level, boom_protect, thirty_off, sauna, silver, gold, diamond, five_ten_fifteen, chance_time, item_type, server) {
  // if (item_type == "tyrant"){
  //     var attempt_cost = item_level**3.56;
  //     return parseFloat(attempt_cost.toFixed(0))
  // }
  let multiplier = 1;

  if (silver && current_star <= 15) {
    multiplier = multiplier - 0.03;
  }
  if (gold && current_star <= 15) {
    multiplier = multiplier - 0.05;
  }
  if (diamond && current_star <= 15) {
    multiplier = multiplier - 0.1;
  }
  if (thirty_off) {
    multiplier = multiplier - 0.3;
  }

  if (server === "kms") {
    //here

    if (boom_protect) {
      multiplier = multiplier + getSafeguardMultiplierIncrease(current_star, sauna, server);
    }

  }
  else {

    if (boom_protect && !(five_ten_fifteen && current_star === 15) && !(chance_time)) {
      multiplier = multiplier + getSafeguardMultiplierIncrease(current_star, sauna, server);
    }

  }

  const attempt_cost = getBaseCost(server, current_star, item_level) * multiplier;
  return parseFloat(attempt_cost.toFixed(0))
}

export function checkChanceTime(decrease_count) {
  return decrease_count === 2
}

export function grabColumnColors(boomsAmount, boomPercentiles) {
  let backgroundColors = [
    'rgba(75, 192, 192, 0.2)', // green
    'rgba(54, 162, 235, 0.2)', // blue
    'rgba(255, 205, 86, 0.2)', // yellow
    'rgba(255, 159, 64, 0.2)', // orange
    'rgba(255, 99, 132, 0.2)', // red
    'rgba(192, 192, 192, 0.2)',// gray
  ];
  let borderColors = [
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(255, 159, 64)',
    'rgb(255, 99, 132)',
    'rgb(192, 192, 192)',
  ];

  switch (true) {
  case boomsAmount === 0:
    return {
      background: backgroundColors[0],
      border: borderColors[0]
    };
  case boomsAmount <= boomPercentiles.median_booms:
    return {
      background: backgroundColors[1],
      border: borderColors[1]
    };
  case boomsAmount <= boomPercentiles.seventy_fifth_percentile_boom:
    return {
      background: backgroundColors[2],
      border: borderColors[2]
    };
  case boomsAmount <= boomPercentiles.eighty_fifth_percentile_boom:
    return {
      background: backgroundColors[3],
      border: borderColors[3]
    };
  case boomsAmount <= boomPercentiles.ninty_fifth_percentile_boom:
    return {
      background: backgroundColors[4],
      border: borderColors[4]
    };
  default:
    return {
      background: backgroundColors[5],
      border: borderColors[5]
    };
  }
}

export function determineOutcome(current_star, rates, star_catch, boom_protect, five_ten_fifteen, sauna, item_type, server, boom_event) {
  /** returns either "Success", "Maintain", "Decrease", or "Boom" */
  if (five_ten_fifteen && server !== 'kms') {
    if (current_star === 5 || current_star === 10 || current_star === 15) {
      return "Success"
    }
  }

  const outcome = Math.random();

  let probability_success = rates[current_star][0];
  let probability_maintain = rates[current_star][1];
  let probability_decrease = rates[current_star][2];
  let probability_boom = rates[current_star][3];

  if (sauna) {
    if ((current_star >= 12 && current_star <= 14) || (item_type === 'tyrant' && (current_star >= 5 && current_star <= 7))) {
      probability_decrease = probability_decrease + probability_boom;
      probability_boom = 0;
    }
  }
  if (boom_event && current_star <= 21) {
    //here
    probability_maintain = probability_maintain + probability_boom * 0.3
    probability_boom = probability_boom * 0.7

    //success + maintain + boom = 1
    //sucess + maintain + boom * (0.7 +0.3) = 1
  }
  if (boom_protect && current_star <= 16 && server !== 'kms') { //boom protection enabled non-KMS
    probability_decrease = probability_decrease + probability_boom;
    probability_boom = 0;
  }
  if (boom_protect && current_star <= 17 && server === 'kms') { //boom protection enabled KMS
    probability_maintain = probability_maintain + probability_boom;
    probability_boom = 0;
  }

  if (star_catch) { //star catch adjustment
    probability_success = probability_success * 1.05;
    const left_over = 1 - probability_success;

    if (probability_decrease === 0) {
      probability_maintain = probability_maintain * (left_over) / (probability_maintain + probability_boom);
      probability_boom = left_over - probability_maintain;
      //console.log('prob of maintain = ' + probability_maintain + ' and prob of boom = ' + probability_boom);


    } else {
      probability_decrease = probability_decrease * (left_over) / (probability_decrease + probability_boom);
      probability_boom = left_over - probability_decrease;
      //console.log('prob of decrease = ' + probability_decrease + ' and prob of boom = ' + probability_boom);
    }
  }
  if (outcome <= probability_success) {
    //console.log("Success");
    return "Success"
  } else if (probability_success < outcome && outcome < probability_success + probability_maintain) {
    //console.log("Maintain");
    return "Maintain"
  } else if (probability_success + probability_maintain < outcome && outcome < probability_success + probability_maintain + probability_decrease) {
    //console.log("Decrease");
    return "Decrease"
  } else if (probability_success + probability_maintain + probability_decrease < outcome && outcome < probability_success + probability_maintain + probability_decrease + probability_boom) {
    //console.log("Boom");
    return "Boom"
  } else {
    //console.log("Case not caputured");
    return "Success"
  }
}

function performExperiment(current_stars, desired_star, rates, item_level, boom_protect, thirty_off, star_catch, five_ten_fifteen, sauna, silver, gold, diamond, item_type, two_plus, useAEE, server, boom_event) {
  /** returns [total_mesos, total_booms]  or [AEE_amount, total_booms]*/
  let current_star = current_stars;
  let total_mesos = 0;
  let total_booms = 0;
  let decrease_count = 0;

  while (current_star < desired_star) {
    let chanceTime = false;
    let outcome = "Success";
    if (useAEE) {
      total_mesos++;
      chanceTime = false;
    }
    else {
      chanceTime = false
      if (server !== 'kms') chanceTime = checkChanceTime(decrease_count);
      total_mesos = total_mesos + attemptCost(current_star, item_level, boom_protect, thirty_off, sauna, silver, gold, diamond, five_ten_fifteen, chanceTime, item_type, server);
    }

    if (chanceTime) {
      outcome = "Success";
      decrease_count = 0;
      if (two_plus && current_star <= 10) {
        current_star = current_star + 2;
      }
      else {
        current_star++
      }
    }
    else {
      outcome = determineOutcome(current_star, rates, star_catch, boom_protect, five_ten_fifteen, sauna, item_type, server, boom_event);

      if (outcome === "Success") {
        decrease_count = 0;
        if (two_plus && current_star <= 10) {
          current_star = current_star + 2;
        }
        else {
          current_star++
        }
      } else if (outcome === "Decrease") {
        decrease_count++;
        current_star--;
      } else if (outcome === "Maintain") {
        decrease_count = 0;
      } else if (outcome === "Boom" && item_type === "normal") {
        decrease_count = 0;
        current_star = 12;
        total_booms++;
      } else if (outcome === "Boom" && item_type === 'tyrant') {
        decrease_count = 0;
        current_star = 0;
        total_booms++;
      }
    }
  }

  return [total_mesos, total_booms]
}

export function repeatExperiment(total_trials, current_star, desired_star, rates, item_level, boom_protect, thirty_off, star_catch, five_ten_fifteen, sauna, silver, gold, diamond, item_type, two_plus, useAEE, server, boom_event) {
  //* return [average_cost, average_booms, meso_result_list, boom_result_list] */
  let total_mesos = 0;
  let total_booms = 0;
  let current_trial = 0;
  const meso_result_list = [];
  const boom_result_list = [];
  const meso_result_list_divided = [];

  while (current_trial < total_trials) {
    const trial_mesos = performExperiment(current_star, desired_star, rates, item_level, boom_protect, thirty_off, star_catch, five_ten_fifteen, sauna, silver, gold, diamond, item_type, two_plus, useAEE, server, boom_event)[0];
    meso_result_list.push(trial_mesos);
    meso_result_list_divided.push(trial_mesos / 1000000000);

    const trial_booms = performExperiment(current_star, desired_star, rates, item_level, boom_protect, thirty_off, star_catch, five_ten_fifteen, sauna, silver, gold, diamond, item_type, two_plus, useAEE, server, boom_event)[1];
    boom_result_list.push(trial_booms);

    total_mesos = total_mesos + trial_mesos;
    total_booms = total_booms + trial_booms;
    current_trial++;
  }
  const average_cost = parseFloat((total_mesos / total_trials).toFixed(0));
  const average_booms = parseFloat((total_booms / total_trials).toFixed(2));

  const median_cost = median(meso_result_list);
  const median_booms = median(boom_result_list);

  const max_cost = Math.max.apply(Math, meso_result_list);
  const max_booms = Math.max.apply(Math, boom_result_list);

  const min_cost = Math.min.apply(Math, meso_result_list);
  const min_booms = Math.min.apply(Math, boom_result_list);

  const meso_std = 0; //parseFloat(standardDeviation(meso_result_list).toFixed(0));
  const boom_std = 0; //parseFloat(standardDeviation(boom_result_list).toFixed(2));

  return [average_cost, average_booms, meso_result_list, boom_result_list, median_cost, median_booms, max_cost, min_cost, max_booms, min_booms, meso_std, boom_std, meso_result_list_divided]
}
