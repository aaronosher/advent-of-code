import System.Environment

getFuel :: Int -> Int
getFuel mass
          | fuel > 0 = fuel + getFuel fuel
          | fuel < 0 = 0
          | otherwise = fuel
        where fuel = mass `div` 3 - 2

sumFuel :: [Int] -> Int
sumFuel []      = 0
sumFuel (x:xs)  = getFuel x + (sumFuel xs)

readF :: [String] -> [Int]
readF = map read

main = do
    [f]     <- getArgs
    modules <- readFile f
    let masses = readF (lines modules)
    let sum = sumFuel(masses)
    print sum