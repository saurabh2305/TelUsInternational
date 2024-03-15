using System;
using System.Collections.Generic;

class RewardsProgram
{
    private List<(int, double)> transactions;

    public RewardsProgram()
    {
        transactions = new List<(int, double)>();
    }

    public void AddTransaction(int customerId, double amount)
    {
        transactions.Add((customerId, amount));
    }

    public (Dictionary<(int, double), int>, Dictionary<int, int>) CalculatePoints()
    {
        var rewardsPerMonth = new Dictionary<(int, double), int>();
        var totalRewards = new Dictionary<int, int>();

        foreach (var (customerId, amount) in transactions)
        {
            int points = 0;
            if (amount > 100)
            {
                points += 2 * (int)(amount - 100);
            }
            if (amount > 50)
            {
                points += (int)(amount - 50);
            }

            var month = (customerId, amount);
            rewardsPerMonth.TryGetValue(month, out int currentPoints);
            rewardsPerMonth[month] = currentPoints + points;

            totalRewards.TryGetValue(customerId, out int total);
            totalRewards[customerId] = total + points;
        }

        return (rewardsPerMonth, totalRewards);
    }
}

class Program
{
    static void Main(string[] args)
    {
        var rewardsProgram = new RewardsProgram();

        // Sample transactions (customer_id, amount) for three months
        var transactions = new List<(int, double)>
        {
            (1, 120),
            (1, 80),
            (2, 70),
            (2, 150),
            (3, 50),
            (3, 200)
        };

        foreach (var (customerId, amount) in transactions)
        {
            rewardsProgram.AddTransaction(customerId, amount);
        }

        var (rewardsPerMonth, totalRewards) = rewardsProgram.CalculatePoints();

        Console.WriteLine("Rewards per month:");
        foreach (var entry in rewardsPerMonth)
        {
            Console.WriteLine($"Customer {entry.Key.Item1} spent ${entry.Key.Item2} and earned {entry.Value} points.");
        }

        Console.WriteLine("\nTotal rewards earned:");
        foreach (var entry in totalRewards)
        {
            Console.WriteLine($"Customer {entry.Key} earned {entry.Value} points in total.");
        }
    }
}