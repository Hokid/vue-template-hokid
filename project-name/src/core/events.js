// @flow

// #events: реализовать логгер событий с авто-отчисткой по достижению лимита записей
import Emmiter from 'events';

class GlobalEvents extends Emmiter {};

const events = new GlobalEvents();

export default events;
