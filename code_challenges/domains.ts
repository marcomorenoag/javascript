// # You are in charge of a display advertising program. Your ads are displayed on websites all over the internet. You have some CSV input data that counts how many times that users have clicked on an ad on each individual domain. Every line consists of a click count and a domain name, like this:
// #counts = [ "900,google.com",
// #     "60,mail.yahoo.com",
// #     "10,mobile.sports.yahoo.com",
// #     "40,sports.yahoo.com",
// #     "300,yahoo.com",
// #     "10,stackoverflow.com",
// #     "20,overflow.com",
// #     "5,com.com",
// #     "2,en.wikipedia.org",
// #     "1,m.wikipedia.org",
// #     "1,mobile.sports",
// #     "1,google.co.uk"]

// #Write a function that takes this input as a parameter and returns a data structure containing the number of clicks that were recorded on each domain AND each subdomain under it. For example, a click on "mail.yahoo.com" counts toward the totals for "mail.yahoo.com", "yahoo.com", and "com". (Subdomains are added to the left of their parent domain. So "mail" and "mail.yahoo" are not valid domains. Note that "mobile.sports" appears as a separate domain near the bottom of the input.)
// #Sample output (in any order/format):

// #calculateClicksByDomain(counts) =>
// #com:                     1345
// #google.com:              900
// #stackoverflow.com:       10
// #overflow.com:            20
// #yahoo.com:               410
// #mail.yahoo.com:          60
// #mobile.sports.yahoo.com: 10
// #sports.yahoo.com:        50
// #com.com:                 5
// #org:                     3
// #wikipedia.org:           3
// #en.wikipedia.org:        2
// #m.wikipedia.org:         1
// #mobile.sports:           1
// #sports:                  1
// #uk:                      1
// #co.uk:                   1
// #google.co.uk:            1

// #n: number of domains in the input
// #(individual domains and subdomains have a constant upper length)

type DomainStat = Record<string, number>;

const counts: string[] = [
  "900,google.com",
  "60,mail.yahoo.com",
  "10,mobile.sports.yahoo.com",
  "40,sports.yahoo.com",
  "300,yahoo.com",
  "10,stackoverflow.com",
  "20,overflow.com",
  "5,com.com",
  "2,en.wikipedia.org",
  "1,m.wikipedia.org",
  "1,mobile.sports",
  "1,google.co.uk",
];

const calculateClicksByDomain = (rawData: string[]): DomainStat => {
  if (rawData.length === 0) return {};

  let statistics: DomainStat = {};

  const helper = (
    total: number,
    domain: string,
    parentDomain: string | null = null
  ) => {
    const [mainDomain, ...subdomain] = domain.split(".").reverse();

    if (subdomain.length === 1 && parentDomain) {
      const previousParentDomain = statistics[parentDomain] || 0;
      const previousDomain = statistics[`${mainDomain}.${parentDomain}`] || 0;
      const previous = statistics[`${domain}.${parentDomain}`] || 0;

      statistics = {
        ...statistics,
        [`${domain}.${parentDomain}`]: previous + total,
        [parentDomain]: previousParentDomain + total,
        [`${mainDomain}.${parentDomain}`]: previousDomain + total,
      };
      return statistics;
    }

    if (subdomain.length === 1 && parentDomain === null) {
      const previousParentDomain = statistics[mainDomain] || 0;
      const previousDomain = statistics[domain] || 0;

      statistics = {
        ...statistics,
        [domain]: previousDomain + total,
        [mainDomain]: previousParentDomain + total,
      };
      return statistics;
    }

    const newParentDomain = parentDomain
      ? { [parentDomain]: (statistics[parentDomain] || 0) + total }
      : {};

    statistics = {
      ...statistics,
      ...helper(
        total,
        subdomain.reverse().join("."),
        `${mainDomain}${parentDomain ? `.${parentDomain}` : ""}`
      ),
      ...newParentDomain,
    };
    return statistics;
  };

  rawData.forEach((row: string) => {
    const [total, domain] = row.split(",");
    helper(Number(total), domain);
  });

  return statistics;
};

console.log(calculateClicksByDomain(counts));