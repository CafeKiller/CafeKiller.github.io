import { EventType } from '@type/event'

const urlChangeEvent = (parme : {}) => new CustomEvent(EventType.URL_QUERY_CHANGE, { detail: parme })

export {
    urlChangeEvent
}