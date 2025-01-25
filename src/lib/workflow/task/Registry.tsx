import React from 'react'
import { LaunchBrowserTask } from './LaunchBrowserTask'
import { PageToHtmlTask } from './PageToHtml'
import { ExtractTextFromElement } from './ExtractTextFromElement'
import { TaskType } from '@/app/types/tasks'
import { WorkflowTask } from '@/app/types/Workflows'

type Registry = {
    [k in TaskType] : WorkflowTask
}


export const TaskRegistry={
    LAUNCH_BROWSER : LaunchBrowserTask,
    PAGE_TO_HTML : PageToHtmlTask,
    EXTRACT_TEXT_FROM_ELEMENT : ExtractTextFromElement
    
}
