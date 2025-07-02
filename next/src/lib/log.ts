import { Log, LogCollector, LogFunction, LogLevel, LogLevels } from "@/app/types/log";

export function createLogCollector() : LogCollector{
    const logs : Log[] = [];
    const getAll = ()=> logs;

    // We can define the log functions mannually but with that we are not utilising the whole functionality of our types so,
    // return {
    //     getAll,
    //     info : (message : string)=> logs.push({level: "info", "message": message, "timestamp" : new Date()}),
    //     error : (message : string)=> logs.push({level: "error", "message": message, "timestamp" : new Date()}),
    //     debug : (message : string)=> logs.push({level: "debug", "message": message, "timestamp" : new Date()}),
    //     warning : (message : string)=> logs.push({level: "warning", "message": message, "timestamp" : new Date()})
    // };

    const logFunctions = {} as Record<LogLevel, LogFunction>;
    LogLevels.forEach(level => logFunctions[level] = (message : string)=> {
        logs.push({message, level, timestamp : new Date()});
    })

    return({
        getAll,
        ...logFunctions
    })

    
}